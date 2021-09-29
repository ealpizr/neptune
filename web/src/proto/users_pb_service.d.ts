// package: neptune
// file: proto/users.proto

import * as proto_users_pb from "../proto/users_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import {grpc} from "@improbable-eng/grpc-web";

type UsersGetMyUser = {
  readonly methodName: string;
  readonly service: typeof Users;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof google_protobuf_empty_pb.Empty;
  readonly responseType: typeof proto_users_pb.MyUserResponse;
};

type UsersFindUserByUsername = {
  readonly methodName: string;
  readonly service: typeof Users;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof proto_users_pb.FindUserByUsernameRequest;
  readonly responseType: typeof proto_users_pb.FindUserByUsernameResponse;
};

export class Users {
  static readonly serviceName: string;
  static readonly GetMyUser: UsersGetMyUser;
  static readonly FindUserByUsername: UsersFindUserByUsername;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class UsersClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  getMyUser(
    requestMessage: google_protobuf_empty_pb.Empty,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: proto_users_pb.MyUserResponse|null) => void
  ): UnaryResponse;
  getMyUser(
    requestMessage: google_protobuf_empty_pb.Empty,
    callback: (error: ServiceError|null, responseMessage: proto_users_pb.MyUserResponse|null) => void
  ): UnaryResponse;
  findUserByUsername(
    requestMessage: proto_users_pb.FindUserByUsernameRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: proto_users_pb.FindUserByUsernameResponse|null) => void
  ): UnaryResponse;
  findUserByUsername(
    requestMessage: proto_users_pb.FindUserByUsernameRequest,
    callback: (error: ServiceError|null, responseMessage: proto_users_pb.FindUserByUsernameResponse|null) => void
  ): UnaryResponse;
}

