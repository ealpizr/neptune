// package: neptune
// file: proto/users.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

export class MyUserResponse extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getEmail(): string;
  setEmail(value: string): void;

  getUsername(): string;
  setUsername(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MyUserResponse.AsObject;
  static toObject(includeInstance: boolean, msg: MyUserResponse): MyUserResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MyUserResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MyUserResponse;
  static deserializeBinaryFromReader(message: MyUserResponse, reader: jspb.BinaryReader): MyUserResponse;
}

export namespace MyUserResponse {
  export type AsObject = {
    id: string,
    email: string,
    username: string,
  }
}

export class FindUserByUsernameRequest extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FindUserByUsernameRequest.AsObject;
  static toObject(includeInstance: boolean, msg: FindUserByUsernameRequest): FindUserByUsernameRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FindUserByUsernameRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FindUserByUsernameRequest;
  static deserializeBinaryFromReader(message: FindUserByUsernameRequest, reader: jspb.BinaryReader): FindUserByUsernameRequest;
}

export namespace FindUserByUsernameRequest {
  export type AsObject = {
    username: string,
  }
}

export class FindUserByUsernameResponse extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getUsername(): string;
  setUsername(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FindUserByUsernameResponse.AsObject;
  static toObject(includeInstance: boolean, msg: FindUserByUsernameResponse): FindUserByUsernameResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FindUserByUsernameResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FindUserByUsernameResponse;
  static deserializeBinaryFromReader(message: FindUserByUsernameResponse, reader: jspb.BinaryReader): FindUserByUsernameResponse;
}

export namespace FindUserByUsernameResponse {
  export type AsObject = {
    id: string,
    username: string,
  }
}

