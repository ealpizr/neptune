package services

import (
	"context"
	"log"
	p "neptune/proto"
	"neptune/src/models"

	"github.com/golang/protobuf/ptypes/empty"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"google.golang.org/grpc/metadata"
)

type ChatService struct {
	server *models.Server
	p.UnimplementedChatsServer
}

func RegisterChatServer(s *models.Server) {
	p.RegisterChatsServer(s.Server, &ChatService{server: s})
}

func (s *ChatService) GetUserChats(ctx context.Context, req *empty.Empty) (*p.UserChatsResponse, error) {
	c := s.server.DB.Collection("chats")

	md, _ := metadata.FromOutgoingContext(ctx)

	uID, _ := primitive.ObjectIDFromHex(md.Get("userID")[0])

	var chats []map[string]interface{}
	cur, err := c.Find(ctx, bson.M{"users": uID})
	if err != nil {
		log.Println(err)
	}

	err = cur.All(ctx, &chats)
	if err != nil {
		log.Println(err)
	}

	var ch []*p.Chat
	for _, v := range chats {
		chat := &p.Chat{}
		for _, u := range v["users"].(primitive.A) {
			if u.(primitive.ObjectID) != uID {
				var user map[string]string
				s.server.DB.Collection("users").FindOne(ctx, bson.M{"_id": u}).Decode(&user)
				chat.User = user["username"]
			}
		}
		test := v["messages"].(primitive.A)[len(v["messages"].(primitive.A))-1].(map[string]interface{})
		log.Println(test)
		chat.Message = &p.Message{Content: test["content"].(string)}
		ch = append(ch, chat)
	}

	return &p.UserChatsResponse{Chats: ch}, nil
}
