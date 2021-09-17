// Code generated by protoc-gen-go-grpc. DO NOT EDIT.

package proto

import (
	context "context"
	empty "github.com/golang/protobuf/ptypes/empty"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

// ChatsClient is the client API for Chats service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type ChatsClient interface {
	GetUserChats(ctx context.Context, in *empty.Empty, opts ...grpc.CallOption) (*UserChatsResponse, error)
}

type chatsClient struct {
	cc grpc.ClientConnInterface
}

func NewChatsClient(cc grpc.ClientConnInterface) ChatsClient {
	return &chatsClient{cc}
}

func (c *chatsClient) GetUserChats(ctx context.Context, in *empty.Empty, opts ...grpc.CallOption) (*UserChatsResponse, error) {
	out := new(UserChatsResponse)
	err := c.cc.Invoke(ctx, "/neptune.Chats/GetUserChats", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// ChatsServer is the server API for Chats service.
// All implementations must embed UnimplementedChatsServer
// for forward compatibility
type ChatsServer interface {
	GetUserChats(context.Context, *empty.Empty) (*UserChatsResponse, error)
	mustEmbedUnimplementedChatsServer()
}

// UnimplementedChatsServer must be embedded to have forward compatible implementations.
type UnimplementedChatsServer struct {
}

func (UnimplementedChatsServer) GetUserChats(context.Context, *empty.Empty) (*UserChatsResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetUserChats not implemented")
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
	in := new(empty.Empty)
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
		return srv.(ChatsServer).GetUserChats(ctx, req.(*empty.Empty))
	}
	return interceptor(ctx, in, info, handler)
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
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "proto/chats.proto",
}