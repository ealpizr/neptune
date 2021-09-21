// Code generated by protoc-gen-go-grpc. DO NOT EDIT.

package proto

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
	emptypb "google.golang.org/protobuf/types/known/emptypb"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

// ChatsClient is the client API for Chats service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type ChatsClient interface {
	GetUserChats(ctx context.Context, in *emptypb.Empty, opts ...grpc.CallOption) (*UserChatsResponse, error)
	SendMessage(ctx context.Context, in *SendMessageRequest, opts ...grpc.CallOption) (*emptypb.Empty, error)
	GetChatMessages(ctx context.Context, in *GetChatMessagesRequest, opts ...grpc.CallOption) (Chats_GetChatMessagesClient, error)
}

type chatsClient struct {
	cc grpc.ClientConnInterface
}

func NewChatsClient(cc grpc.ClientConnInterface) ChatsClient {
	return &chatsClient{cc}
}

func (c *chatsClient) GetUserChats(ctx context.Context, in *emptypb.Empty, opts ...grpc.CallOption) (*UserChatsResponse, error) {
	out := new(UserChatsResponse)
	err := c.cc.Invoke(ctx, "/neptune.Chats/GetUserChats", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *chatsClient) SendMessage(ctx context.Context, in *SendMessageRequest, opts ...grpc.CallOption) (*emptypb.Empty, error) {
	out := new(emptypb.Empty)
	err := c.cc.Invoke(ctx, "/neptune.Chats/SendMessage", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *chatsClient) GetChatMessages(ctx context.Context, in *GetChatMessagesRequest, opts ...grpc.CallOption) (Chats_GetChatMessagesClient, error) {
	stream, err := c.cc.NewStream(ctx, &Chats_ServiceDesc.Streams[0], "/neptune.Chats/GetChatMessages", opts...)
	if err != nil {
		return nil, err
	}
	x := &chatsGetChatMessagesClient{stream}
	if err := x.ClientStream.SendMsg(in); err != nil {
		return nil, err
	}
	if err := x.ClientStream.CloseSend(); err != nil {
		return nil, err
	}
	return x, nil
}

type Chats_GetChatMessagesClient interface {
	Recv() (*Message, error)
	grpc.ClientStream
}

type chatsGetChatMessagesClient struct {
	grpc.ClientStream
}

func (x *chatsGetChatMessagesClient) Recv() (*Message, error) {
	m := new(Message)
	if err := x.ClientStream.RecvMsg(m); err != nil {
		return nil, err
	}
	return m, nil
}

// ChatsServer is the server API for Chats service.
// All implementations must embed UnimplementedChatsServer
// for forward compatibility
type ChatsServer interface {
	GetUserChats(context.Context, *emptypb.Empty) (*UserChatsResponse, error)
	SendMessage(context.Context, *SendMessageRequest) (*emptypb.Empty, error)
	GetChatMessages(*GetChatMessagesRequest, Chats_GetChatMessagesServer) error
	mustEmbedUnimplementedChatsServer()
}

// UnimplementedChatsServer must be embedded to have forward compatible implementations.
type UnimplementedChatsServer struct {
}

func (UnimplementedChatsServer) GetUserChats(context.Context, *emptypb.Empty) (*UserChatsResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetUserChats not implemented")
}
func (UnimplementedChatsServer) SendMessage(context.Context, *SendMessageRequest) (*emptypb.Empty, error) {
	return nil, status.Errorf(codes.Unimplemented, "method SendMessage not implemented")
}
func (UnimplementedChatsServer) GetChatMessages(*GetChatMessagesRequest, Chats_GetChatMessagesServer) error {
	return status.Errorf(codes.Unimplemented, "method GetChatMessages not implemented")
}
func (UnimplementedChatsServer) mustEmbedUnimplementedChatsServer() {}

// UnsafeChatsServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to ChatsServer will
// result in compilation errors.
type UnsafeChatsServer interface {
	mustEmbedUnimplementedChatsServer()
}

func RegisterChatsServer(s grpc.ServiceRegistrar, srv ChatsServer) {
	s.RegisterService(&Chats_ServiceDesc, srv)
}

func _Chats_GetUserChats_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(emptypb.Empty)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ChatsServer).GetUserChats(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/neptune.Chats/GetUserChats",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ChatsServer).GetUserChats(ctx, req.(*emptypb.Empty))
	}
	return interceptor(ctx, in, info, handler)
}

func _Chats_SendMessage_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(SendMessageRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ChatsServer).SendMessage(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/neptune.Chats/SendMessage",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ChatsServer).SendMessage(ctx, req.(*SendMessageRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Chats_GetChatMessages_Handler(srv interface{}, stream grpc.ServerStream) error {
	m := new(GetChatMessagesRequest)
	if err := stream.RecvMsg(m); err != nil {
		return err
	}
	return srv.(ChatsServer).GetChatMessages(m, &chatsGetChatMessagesServer{stream})
}

type Chats_GetChatMessagesServer interface {
	Send(*Message) error
	grpc.ServerStream
}

type chatsGetChatMessagesServer struct {
	grpc.ServerStream
}

func (x *chatsGetChatMessagesServer) Send(m *Message) error {
	return x.ServerStream.SendMsg(m)
}

// Chats_ServiceDesc is the grpc.ServiceDesc for Chats service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var Chats_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "neptune.Chats",
	HandlerType: (*ChatsServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "GetUserChats",
			Handler:    _Chats_GetUserChats_Handler,
		},
		{
			MethodName: "SendMessage",
			Handler:    _Chats_SendMessage_Handler,
		},
	},
	Streams: []grpc.StreamDesc{
		{
			StreamName:    "GetChatMessages",
			Handler:       _Chats_GetChatMessages_Handler,
			ServerStreams: true,
		},
	},
	Metadata: "proto/chats.proto",
}
