package services

import (
	"context"
	"log"
	p "neptune/proto"
	"neptune/src/models"

	"github.com/golang/protobuf/ptypes/empty"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
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

	log.Println(req.Receiver)

	ur, err := c.UpdateOne(ctx, primitive.M{"users": primitive.M{"$all": primitive.A{uID, req.Receiver}}}, bson.M{
		"$push": bson.M{
			"messages": p.Message{
				Content:   req.Content,
				Timestamp: timestamppb.Now(),
				Sender:    uID,
			},
		},
	}, options.Update().SetUpsert(true))

	if err != nil {
		log.Println(err)
		return &empty.Empty{}, status.Error(codes.Internal, "internal error, try again later")
	}

	log.Println(ur)

	return &empty.Empty{}, nil

}
