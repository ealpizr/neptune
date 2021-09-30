package services

import (
	"context"
	"log"
	p "neptune/proto"
	"neptune/src/models"

	"github.com/golang/protobuf/ptypes/empty"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
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

func (s *UsersService) FindUserByUsername(ctx context.Context, req *p.FindUserByUsernameRequest) (*p.FindUserByUsernameResponse, error) {
	c := s.server.DB.Collection("users")

	user := struct {
		ID       primitive.ObjectID `bson:"_id"`
		Username string
	}{}

	if err := c.FindOne(ctx, bson.M{"username": req.Username}).Decode(&user); err != nil {
		if err == mongo.ErrNoDocuments {
			return &p.FindUserByUsernameResponse{}, nil
		}
		log.Println(err)
		return nil, status.Error(codes.Internal, "internal error, try again later")
	}

	return &p.FindUserByUsernameResponse{
		ID:       user.ID.Hex(),
		Username: user.Username,
	}, nil
}
