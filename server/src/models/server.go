package models

import (
	p "neptune/proto"

	"go.mongodb.org/mongo-driver/mongo"
	"google.golang.org/grpc"
)

type Server struct {
	p.UnimplementedGreeterServer
	p.UnimplementedAuthServer
	Server *grpc.Server
	DB     *mongo.Database
}

func NewServer(opts []grpc.ServerOption) *Server {
	return &Server{
		Server: grpc.NewServer(opts...),
	}
}
