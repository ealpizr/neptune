// package: neptune
// file: proto/neptune.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";

export class TestRequest extends jspb.Message {
  getMessage(): string;
  setMessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TestRequest.AsObject;
  static toObject(includeInstance: boolean, msg: TestRequest): TestRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TestRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TestRequest;
  static deserializeBinaryFromReader(message: TestRequest, reader: jspb.BinaryReader): TestRequest;
}

export namespace TestRequest {
  export type AsObject = {
    message: string,
  }
}

export class Packet extends jspb.Message {
  getType(): TypeMap[keyof TypeMap];
  setType(value: TypeMap[keyof TypeMap]): void;

  hasRefreshtoken(): boolean;
  clearRefreshtoken(): void;
  getRefreshtoken(): RefreshToken | undefined;
  setRefreshtoken(value?: RefreshToken): void;

  clearChatlistList(): void;
  getChatlistList(): Array<Chat>;
  setChatlistList(value: Array<Chat>): void;
  addChatlist(value?: Chat, index?: number): Chat;

  hasChatitem(): boolean;
  clearChatitem(): void;
  getChatitem(): Chat | undefined;
  setChatitem(value?: Chat): void;

  clearMessagelistList(): void;
  getMessagelistList(): Array<Message>;
  setMessagelistList(value: Array<Message>): void;
  addMessagelist(value?: Message, index?: number): Message;

  hasMessageitem(): boolean;
  clearMessageitem(): void;
  getMessageitem(): Message | undefined;
  setMessageitem(value?: Message): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Packet.AsObject;
  static toObject(includeInstance: boolean, msg: Packet): Packet.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Packet, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Packet;
  static deserializeBinaryFromReader(message: Packet, reader: jspb.BinaryReader): Packet;
}

export namespace Packet {
  export type AsObject = {
    type: TypeMap[keyof TypeMap],
    refreshtoken?: RefreshToken.AsObject,
    chatlistList: Array<Chat.AsObject>,
    chatitem?: Chat.AsObject,
    messagelistList: Array<Message.AsObject>,
    messageitem?: Message.AsObject,
  }
}

export class RefreshToken extends jspb.Message {
  getAccesstoken(): string;
  setAccesstoken(value: string): void;

  getRefreshtoken(): string;
  setRefreshtoken(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RefreshToken.AsObject;
  static toObject(includeInstance: boolean, msg: RefreshToken): RefreshToken.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RefreshToken, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RefreshToken;
  static deserializeBinaryFromReader(message: RefreshToken, reader: jspb.BinaryReader): RefreshToken;
}

export namespace RefreshToken {
  export type AsObject = {
    accesstoken: string,
    refreshtoken: string,
  }
}

export class Chat extends jspb.Message {
  clearUsersList(): void;
  getUsersList(): Array<string>;
  setUsersList(value: Array<string>): void;
  addUsers(value: string, index?: number): string;

  clearMessagesList(): void;
  getMessagesList(): Array<Message>;
  setMessagesList(value: Array<Message>): void;
  addMessages(value?: Message, index?: number): Message;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Chat.AsObject;
  static toObject(includeInstance: boolean, msg: Chat): Chat.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Chat, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Chat;
  static deserializeBinaryFromReader(message: Chat, reader: jspb.BinaryReader): Chat;
}

export namespace Chat {
  export type AsObject = {
    usersList: Array<string>,
    messagesList: Array<Message.AsObject>,
  }
}

export class Message extends jspb.Message {
  getSenderid(): string;
  setSenderid(value: string): void;

  getContent(): string;
  setContent(value: string): void;

  hasTimestamp(): boolean;
  clearTimestamp(): void;
  getTimestamp(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setTimestamp(value?: google_protobuf_timestamp_pb.Timestamp): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Message.AsObject;
  static toObject(includeInstance: boolean, msg: Message): Message.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Message, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Message;
  static deserializeBinaryFromReader(message: Message, reader: jspb.BinaryReader): Message;
}

export namespace Message {
  export type AsObject = {
    senderid: string,
    content: string,
    timestamp?: google_protobuf_timestamp_pb.Timestamp.AsObject,
  }
}

export interface TypeMap {
  REFRESH_TOKEN: 0;
  CHAT_LIST: 1;
  CHAT_ITEM: 2;
  MESSAGE_LIST: 3;
  MESSAGE_ITEM: 4;
}

export const Type: TypeMap;
