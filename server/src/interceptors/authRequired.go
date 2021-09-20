package interceptors

import (
	"context"
	"neptune/src/utils"
	"strings"

	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/metadata"
	"google.golang.org/grpc/status"
)

func AuthRequired(ctx context.Context, req interface{}, info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (interface{}, error) {

	// dont use in auth endpoints
	if strings.Contains(info.FullMethod, "/neptune.Auth") {
		return handler(ctx, req)
	}

	if info.FullMethod == "/neptune.Users/FindUserByUsername" {
		return handler(ctx, req)
	}

	md, _ := metadata.FromIncomingContext(ctx)
	token := md["authorization"]

	if len(token) == 0 {
		return req, status.Error(codes.Unauthenticated, "authorization token was not provided")
	}

	uid, err := utils.GetUserIDFromJWT(token[0])
	if err != nil {
		return req, status.Error(codes.Unauthenticated, err.Error())
	}

	ctx = metadata.AppendToOutgoingContext(ctx, "userID", uid)
	return handler(ctx, req)
}
