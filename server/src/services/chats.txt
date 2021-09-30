package services

import (
	"context"
	"log"
	p "neptune/proto"
	"neptune/src/models"
	"neptune/src/utils"

	"github.com/golang/protobuf/ptypes/empty"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/metadata"
	"google.golang.org/grpc/status"
	"google.golang.org/protobuf/types/known/timestamppb"
)

type ChatService struct {
	server *models.Server
	p.UnimplementedChatsServer
}

func RegisterChatServer(s *models.Server) {
	p.RegisterChatsServer(s.Server, &ChatService{server: s})
}

func (s *ChatService) GetUserChats(ctx context.Context, req *empty.Empty) (*p.UserChatsResponse, error) {
	c := s.server.DB.Collection("chats")

	md, _ := metadata.FromOutgoingContext(ctx)

	uID := md.Get("userID")[0]

	var chats []map[string]interface{}
	cur, err := c.Find(ctx, bson.M{"users": uID})
	if err != nil {
		log.Println(err)
	}

	err = cur.All(ctx, &chats)
	if err != nil {
		log.Println(err)
	}

	var ch []*p.Chat
	for _, v := range chats {
		chat := &p.Chat{}
		for _, u := range v["users"].(primitive.A) {
			if u != uID {
				var user map[string]string
				id, _ := primitive.ObjectIDFromHex(u.(string))
				s.server.DB.Collection("users").FindOne(ctx, bson.M{"_id": id}).Decode(&user)
				chat.User = user["username"]
				chat.ReceiverID = user["_id"]
			}
		}
		test := v["messages"].(primitive.A)[len(v["messages"].(primitive.A))-1].(map[string]interface{})
		log.Println(test)
		chat.Message = &p.Message{Content: test["content"].(string)}

		ch = append(ch, chat)
	}

	return &p.UserChatsResponse{Chats: ch}, nil
}

func (s *ChatService) SendMessage(ctx context.Context, req *p.SendMessageRequest) (*empty.Empty, error) {
	c := s.server.DB.Collection("chats")

	md, _ := metadata.FromOutgoingContext(ctx)

	uID := md.Get("userID")[0]

	msg := &p.Message{
		Content:   req.Content,
		Timestamp: timestamppb.Now(),
		Sender:    uID,
	}

	ok, err := c.UpdateOne(ctx, primitive.M{"users": primitive.M{"$all": primitive.A{uID, req.Receiver}}}, bson.M{
		"$push": bson.M{
			"messages": msg,
		},
	})

	if ok.MatchedCount == 0 {
		_, err = c.InsertOne(ctx, primitive.M{"users": primitive.A{uID, req.Receiver}, "messages": primitive.A{msg}})
		if err != nil {
			log.Println(err)
		}
	}

	if err != nil {
		log.Println(err)
		return &empty.Empty{}, status.Error(codes.Internal, "internal error, try again later")
	}

	go func() {
		s.server.Clients[uID] <- msg
	}()

	return &empty.Empty{}, nil

}

func (s *ChatService) GetChatMessages(req *p.GetChatMessagesRequest, stream p.Chats_GetChatMessagesServer) error {
	c := s.server.DB.Collection("chats")

	md, _ := metadata.FromIncomingContext(stream.Context())
	token := md["authorization"]

	if len(token) == 0 {
		return status.Error(codes.Unauthenticated, "authorization token was not provided")
	}

	uID, err := utils.GetUserIDFromJWT(token[0])
	if err != nil {
		return status.Error(codes.Unauthenticated, err.Error())
	}

	receiverID := req.ReceiverId

	messages := struct {
		Messages []*p.Message
	}{}

	if err := c.FindOne(stream.Context(), primitive.M{"users": primitive.M{"$all": primitive.A{primitive.M{"$elemMatch": primitive.M{"$eq": uID}}, primitive.M{"$elemMatch": primitive.M{"$eq": receiverID}}}}}).Decode(&messages); err != nil {
		log.Println(err)
	}

	s.server.Clients[uID] = make(chan interface{})

	go func() {
		for _, z := range messages.Messages {
			s.server.Clients[uID] <- z
		}
	}()

	for m := range s.server.Clients[uID] {
		stream.Send(m.(*p.Message))
	}

	log.Println("before return")

	return nil
}
