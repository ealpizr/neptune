package services

import (
	"context"
	"log"
	pb "neptune/proto"
	"neptune/src/models"
	"neptune/src/utils"
	"time"

	"github.com/golang/protobuf/ptypes/empty"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/metadata"
	"google.golang.org/grpc/status"
)

type NeptuneService struct {
	server *models.Server
	pb.UnimplementedNeptuneServer
}

func RegisterNeptuneServer(s *models.Server) {
	pb.RegisterNeptuneServer(s.Server, &NeptuneService{server: s})
}

func (s *NeptuneService) Connect(req *empty.Empty, stream pb.Neptune_ConnectServer) error {
	md, _ := metadata.FromIncomingContext(stream.Context())
	authToken := md.Get("authorization")
	log.Println(md)

	if len(authToken) == 0 {
		return status.Error(codes.Unauthenticated, "authentication token was not provided")
	}

	uID, err := utils.GetUserIDFromJWT(authToken[0])
	if err != nil {
		return status.Error(codes.Unauthenticated, err.Error())
	}

	s.server.Clients[uID] = make(chan *pb.Packet)

	for {
		stream.Send(<-s.server.Clients[uID])
		time.Sleep(500 * time.Millisecond)
	}
}

func (s *NeptuneService) GetCurrentUser(ctx context.Context, req *empty.Empty) (*empty.Empty, error) {
	c := s.server.DB.Collection("users")

	md, _ := metadata.FromOutgoingContext(ctx)
	uID, _ := primitive.ObjectIDFromHex(md.Get("userID")[0])

	user := struct {
		ID       string `bson:"_id"`
		Username string
	}{}
	c.FindOne(ctx, bson.M{"_id": uID}).Decode(&user)

	s.server.Clients[uID.Hex()] <- &pb.Packet{
		Type: pb.Type_CURRENT_USER,
		CurrentUser: &pb.User{
			ID:       user.ID,
			Username: user.Username,
		},
	}

	return &empty.Empty{}, nil
}

func (s *NeptuneService) GetChats(ctx context.Context, req *empty.Empty) (*empty.Empty, error) {
	c := s.server.DB.Collection("chats")

	md, _ := metadata.FromOutgoingContext(ctx)
	uID, _ := primitive.ObjectIDFromHex(md.Get("userID")[0])

	chats := []struct {
		Users    []primitive.ObjectID
		Messages []*pb.Message
	}{}
	cur, _ := c.Find(ctx, bson.M{"users": uID})
	cur.All(ctx, &chats)

	cl := []*pb.Chat{}

	for _, c := range chats {
		users := []string{}
		for _, u := range c.Users {
			users = append(users, u.Hex())
		}

		cl = append(cl, &pb.Chat{
			Users:    users,
			Messages: c.Messages,
		})
	}

	s.server.Clients[uID.Hex()] <- &pb.Packet{
		Type:     pb.Type_CHAT_LIST,
		ChatList: cl,
	}

	return &empty.Empty{}, nil
}

func (s *NeptuneService) FindUserByUsername(ctx context.Context, req *pb.FindUserByUsernameRequest) (*empty.Empty, error) {

	c := s.server.DB.Collection("users")

	md, _ := metadata.FromOutgoingContext(ctx)
	uID, _ := primitive.ObjectIDFromHex(md.Get("userID")[0])

	if len(req.Username) < 3 {
		s.server.Clients[uID.Hex()] <- &pb.Packet{
			Type: pb.Type_USER_LIST,
		}

		return &empty.Empty{}, nil
	}

	cur, _ := c.Find(ctx, bson.M{"username": bson.M{"$regex": req.Username, "$options": "i"}})

	users := []struct {
		ID       primitive.ObjectID `bson:"_id"`
		Username string
	}{}

	cur.All(ctx, &users)

	ul := []*pb.User{}
	for _, u := range users {
		if u.ID != uID {
			ul = append(ul, &pb.User{
				ID:       u.ID.Hex(),
				Username: u.Username,
			})
		}
	}

	s.server.Clients[uID.Hex()] <- &pb.Packet{
		Type:     pb.Type_USER_LIST,
		UserList: ul,
	}

	return &empty.Empty{}, nil
}

func (s *NeptuneService) SendMessage(ctx context.Context, req *pb.SendMessageRequest) (*empty.Empty, error) {
	c := s.server.DB.Collection("chats")

	md, _ := metadata.FromOutgoingContext(ctx)
	uID, _ := primitive.ObjectIDFromHex(md.Get("userID")[0])
	remoteUserID, _ := primitive.ObjectIDFromHex(req.RemoteUserID)

	ok, _ := c.UpdateOne(ctx, primitive.M{"users": primitive.M{"$all": primitive.A{uID, remoteUserID}}}, bson.M{
		"$push": bson.M{
			"messages": req.Message,
		},
	})

	pck := &pb.Packet{
		Type:        pb.Type_MESSAGE_ITEM,
		MessageItem: req.Message,
	}

	if ok.MatchedCount == 0 {
		ir, _ := c.InsertOne(ctx, primitive.M{"users": primitive.A{uID, remoteUserID}, "messages": primitive.A{req.Message}})
		pck = &pb.Packet{
			Type: pb.Type_CHAT_ITEM,
			ChatItem: &pb.Chat{
				ID:    ir.InsertedID.(primitive.ObjectID).Hex(),
				Users: []string{uID.Hex(), remoteUserID.Hex()},
				Messages: []*pb.Message{
					req.Message,
				},
			},
		}
	}

	ch, online := s.server.Clients[remoteUserID.Hex()]
	if online {
		ch <- pck
	}

	s.server.Clients[uID.Hex()] <- pck

	log.Println("packet sent was")
	log.Println(pck)

	return &empty.Empty{}, nil
}

func (s *NeptuneService) Test(ctx context.Context, req *pb.TestRequest) (*empty.Empty, error) {
	md, _ := metadata.FromOutgoingContext(ctx)
	uID := md.Get("userID")[0]

	ch, ok := s.server.Clients[uID]
	if !ok {
		return nil, status.Error(codes.PermissionDenied, "you need to connect to neptune first")
	}

	ch <- &pb.Packet{
		Type: pb.Type_REFRESH_TOKEN,
		RefreshToken: &pb.RefreshToken{
			AccessToken:  req.Message,
			RefreshToken: "This is a refresh token",
		},
	}

	return &empty.Empty{}, nil
}
