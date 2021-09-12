package services

import (
	"context"
	"log"
	p "neptune/proto"
	"neptune/src/models"

	"github.com/golang/protobuf/ptypes/empty"
	"go.mongodb.org/mongo-driver/bson"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/metadata"
	"google.golang.org/grpc/status"
)

type UsersService struct {
	server *models.Server
	p.UnimplementedUsersServer
}

func RegisterUsersService(s *models.Server) {
	p.RegisterUsersServer(s.Server, &UsersService{server: s})
}

func (s *UsersService) GetMyUser(ctx context.Context, req *empty.Empty) (*p.MyUserResponse, error) {
	c := s.server.DB.Collection("users")

	md, ok := metadata.FromIncomingContext(ctx)
	if !ok {
		return nil, status.Error(codes.Internal, "internal error, try again later")
	}

	var user map[string]string
	c.FindOne(ctx, bson.M{"id": md["userID"]}).Decode(&user)

	log.Println(user)

	return &p.MyUserResponse{
		Email:    user["email"],
		Username: user["username"],
	}, nil
}
