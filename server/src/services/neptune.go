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
