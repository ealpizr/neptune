/**
 * @fileoverview gRPC-Web generated client stub for neptune
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');


var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js')

var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js')
const proto = {};
proto.neptune = require('./chats_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.neptune.ChatsClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.neptune.ChatsPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.google.protobuf.Empty,
 *   !proto.neptune.UserChatsResponse>}
 */
const methodDescriptor_Chats_GetUserChats = new grpc.web.MethodDescriptor(
  '/neptune.Chats/GetUserChats',
  grpc.web.MethodType.UNARY,
  google_protobuf_empty_pb.Empty,
  proto.neptune.UserChatsResponse,
  /**
   * @param {!proto.google.protobuf.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.neptune.UserChatsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.google.protobuf.Empty,
 *   !proto.neptune.UserChatsResponse>}
 */
const methodInfo_Chats_GetUserChats = new grpc.web.AbstractClientBase.MethodInfo(
  proto.neptune.UserChatsResponse,
  /**
   * @param {!proto.google.protobuf.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.neptune.UserChatsResponse.deserializeBinary
);


/**
 * @param {!proto.google.protobuf.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.neptune.UserChatsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.neptune.UserChatsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.neptune.ChatsClient.prototype.getUserChats =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/neptune.Chats/GetUserChats',
      request,
      metadata || {},
      methodDescriptor_Chats_GetUserChats,
      callback);
};


/**
 * @param {!proto.google.protobuf.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.neptune.UserChatsResponse>}
 *     Promise that resolves to the response
 */
proto.neptune.ChatsPromiseClient.prototype.getUserChats =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/neptune.Chats/GetUserChats',
      request,
      metadata || {},
      methodDescriptor_Chats_GetUserChats);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.neptune.SendMessageRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodDescriptor_Chats_SendMessage = new grpc.web.MethodDescriptor(
  '/neptune.Chats/SendMessage',
  grpc.web.MethodType.UNARY,
  proto.neptune.SendMessageRequest,
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.neptune.SendMessageRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.neptune.SendMessageRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_Chats_SendMessage = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.neptune.SendMessageRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.neptune.SendMessageRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.neptune.ChatsClient.prototype.sendMessage =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/neptune.Chats/SendMessage',
      request,
      metadata || {},
      methodDescriptor_Chats_SendMessage,
      callback);
};


/**
 * @param {!proto.neptune.SendMessageRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     Promise that resolves to the response
 */
proto.neptune.ChatsPromiseClient.prototype.sendMessage =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/neptune.Chats/SendMessage',
      request,
      metadata || {},
      methodDescriptor_Chats_SendMessage);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.neptune.GetChatMessagesRequest,
 *   !proto.neptune.Message>}
 */
const methodDescriptor_Chats_GetChatMessages = new grpc.web.MethodDescriptor(
  '/neptune.Chats/GetChatMessages',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.neptune.GetChatMessagesRequest,
  proto.neptune.Message,
  /**
   * @param {!proto.neptune.GetChatMessagesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.neptune.Message.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.neptune.GetChatMessagesRequest,
 *   !proto.neptune.Message>}
 */
const methodInfo_Chats_GetChatMessages = new grpc.web.AbstractClientBase.MethodInfo(
  proto.neptune.Message,
  /**
   * @param {!proto.neptune.GetChatMessagesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.neptune.Message.deserializeBinary
);


/**
 * @param {!proto.neptune.GetChatMessagesRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.neptune.Message>}
 *     The XHR Node Readable Stream
 */
proto.neptune.ChatsClient.prototype.getChatMessages =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/neptune.Chats/GetChatMessages',
      request,
      metadata || {},
      methodDescriptor_Chats_GetChatMessages);
};


/**
 * @param {!proto.neptune.GetChatMessagesRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.neptune.Message>}
 *     The XHR Node Readable Stream
 */
proto.neptune.ChatsPromiseClient.prototype.getChatMessages =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/neptune.Chats/GetChatMessages',
      request,
      metadata || {},
      methodDescriptor_Chats_GetChatMessages);
};


module.exports = proto.neptune;

