package services

import (
	"context"
	p "neptune/proto"
	"neptune/src/models"

	"github.com/golang/protobuf/ptypes/empty"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
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

	md, ok := metadata.FromOutgoingContext(ctx)
	if !ok {
		return nil, status.Error(codes.Internal, "internal error, try again later")
	}

	uID, _ := primitive.ObjectIDFromHex(md.Get("userID")[0])

	var user map[string]string
	c.FindOne(ctx, bson.M{"_id": uID}).Decode(&user)

	return &p.MyUserResponse{
		ID:       user["_id"],
		Email:    user["email"],
		Username: user["username"],
	}, nil
}
