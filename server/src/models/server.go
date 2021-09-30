package models

import (
	"neptune/proto"
	p "neptune/proto"

	"go.mongodb.org/mongo-driver/mongo"
	"google.golang.org/grpc"
)

type Server struct {
	p.UnimplementedNeptuneServer
	p.UnimplementedAuthServer
	Server  *grpc.Server
	DB      *mongo.Database
	Clients map[string](chan *proto.Packet)
}

func NewServer(opts []grpc.ServerOption) *Server {
	return &Server{
		Server:  grpc.NewServer(opts...),
		Clients: make(map[string]chan *p.Packet),
	}
}
