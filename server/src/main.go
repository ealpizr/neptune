package main

import (
	"log"
	"neptune/src/database"
	"neptune/src/interceptors"
	"neptune/src/models"
	"neptune/src/services"
	"net"

	"google.golang.org/grpc"
)

func main() {
	serverOpts := []grpc.ServerOption{
		grpc.UnaryInterceptor(interceptors.AuthRequired),
	}

	s := models.NewServer(serverOpts)
	s.DB = database.Connect("mongodb+srv://mongo:mongo@cluster0.arf9f.mongodb.net", "neptune")

	services.RegisterAuthService(s)
	services.RegisterUsersService(s)

	lis, err := net.Listen("tcp", ":3001")
	if err != nil {
		log.Fatal(err)
	}

	log.Println("starting grpc server")
	if err := s.Server.Serve(lis); err != nil {
		log.Fatal(err)
	}
}
