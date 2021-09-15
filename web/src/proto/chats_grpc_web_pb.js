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


module.exports = proto.neptune;

