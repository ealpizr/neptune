package services

import (
	"context"
	"log"
	p "neptune/proto"
	"neptune/src/models"
	"neptune/src/utils"
	"strings"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type AuthService struct {
	server *models.Server
	p.UnimplementedAuthServer
}

func RegisterAuthService(s *models.Server) {
	p.RegisterAuthServer(s.Server, &AuthService{server: s})
}

func (s *AuthService) SignUp(ctx context.Context, req *p.SignUpRequest) (*p.SignUpResponse, error) {
	c := s.server.DB.Collection("users")

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		log.Printf("could not hash password: %s\n", err)
		return nil, status.Errorf(codes.Internal, "internal error, try again later")
	}

	req.Password = string(hashedPassword)

	_, err = c.InsertOne(ctx, req)

	if err != nil {
		if mongo.IsDuplicateKeyError(err) {
			if strings.Contains(err.Error(), "email") {
				return nil, status.Errorf(codes.AlreadyExists, "email is already in use")
			}
			if strings.Contains(err.Error(), "username") {
				return nil, status.Errorf(codes.AlreadyExists, "username is already in use")
			}
		}

		log.Printf("could not create user: %t\n", err)
		return nil, status.Errorf(codes.Internal, "internal error, try again later")
	}

	return &p.SignUpResponse{Message: "account created successfully"}, nil
}

func (s *AuthService) Login(ctx context.Context, req *p.LoginRequest) (*p.LoginResponse, error) {
	c := s.server.DB.Collection("users")

	var user map[string]string
	if err := c.FindOne(ctx, bson.M{"username": req.Username}).Decode(&user); err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, status.Error(codes.PermissionDenied, "invalid credentials")
		}
		log.Println(err)
		return nil, status.Error(codes.Internal, "internal error, try again later")
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user["password"]), []byte(req.Password)); err != nil {
		return nil, status.Error(codes.PermissionDenied, "invalid credentials")
	}

	accessToken, refreshToken, err := utils.GenerateJWT(user["_id"])
	if err != nil {
		log.Println(err)
		return nil, status.Error(codes.Internal, "internal error, try again later")
	}

	return &p.LoginResponse{AccessToken: accessToken, RefreshToken: refreshToken}, nil
}
