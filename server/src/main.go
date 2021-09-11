package main

import (
	"context"
	"fmt"
	"log"
	p "neptune/proto"
	"net"

	"google.golang.org/grpc"
)

type Server struct {
	p.UnimplementedGreeterServer
}

func (s *Server) GreetMe(ctx context.Context, req *p.GreetingRequest) (*p.GreetingResponse, error) {
	return &p.GreetingResponse{Message: fmt.Sprintf("Hello '%s' from GO!", req.Name)}, nil
}

func main() {
	lis, err := net.Listen("tcp", ":3001")
	if err != nil {
		log.Fatal(err)
	}

	s := Server{}
	grpcServer := grpc.NewServer()
	p.RegisterGreeterServer(grpcServer, &s)

	log.Println("starting grpc server")
	if err := grpcServer.Serve(lis); err != nil {
		log.Fatal(err)
	}

}
