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
const proto = {};
proto.neptune = require('./users_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.neptune.UsersClient =
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
proto.neptune.UsersPromiseClient =
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
 *   !proto.neptune.MyUserResponse>}
 */
const methodDescriptor_Users_GetMyUser = new grpc.web.MethodDescriptor(
  '/neptune.Users/GetMyUser',
  grpc.web.MethodType.UNARY,
  google_protobuf_empty_pb.Empty,
  proto.neptune.MyUserResponse,
  /**
   * @param {!proto.google.protobuf.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.neptune.MyUserResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.google.protobuf.Empty,
 *   !proto.neptune.MyUserResponse>}
 */
const methodInfo_Users_GetMyUser = new grpc.web.AbstractClientBase.MethodInfo(
  proto.neptune.MyUserResponse,
  /**
   * @param {!proto.google.protobuf.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.neptune.MyUserResponse.deserializeBinary
);


/**
 * @param {!proto.google.protobuf.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.neptune.MyUserResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.neptune.MyUserResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.neptune.UsersClient.prototype.getMyUser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/neptune.Users/GetMyUser',
      request,
      metadata || {},
      methodDescriptor_Users_GetMyUser,
      callback);
};


/**
 * @param {!proto.google.protobuf.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.neptune.MyUserResponse>}
 *     Promise that resolves to the response
 */
proto.neptune.UsersPromiseClient.prototype.getMyUser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/neptune.Users/GetMyUser',
      request,
      metadata || {},
      methodDescriptor_Users_GetMyUser);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.neptune.FindUserByUsernameRequest,
 *   !proto.neptune.FindUserByUsernameResponse>}
 */
const methodDescriptor_Users_FindUserByUsername = new grpc.web.MethodDescriptor(
  '/neptune.Users/FindUserByUsername',
  grpc.web.MethodType.UNARY,
  proto.neptune.FindUserByUsernameRequest,
  proto.neptune.FindUserByUsernameResponse,
  /**
   * @param {!proto.neptune.FindUserByUsernameRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.neptune.FindUserByUsernameResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.neptune.FindUserByUsernameRequest,
 *   !proto.neptune.FindUserByUsernameResponse>}
 */
const methodInfo_Users_FindUserByUsername = new grpc.web.AbstractClientBase.MethodInfo(
  proto.neptune.FindUserByUsernameResponse,
  /**
   * @param {!proto.neptune.FindUserByUsernameRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.neptune.FindUserByUsernameResponse.deserializeBinary
);


/**
 * @param {!proto.neptune.FindUserByUsernameRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.neptune.FindUserByUsernameResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.neptune.FindUserByUsernameResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.neptune.UsersClient.prototype.findUserByUsername =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/neptune.Users/FindUserByUsername',
      request,
      metadata || {},
      methodDescriptor_Users_FindUserByUsername,
      callback);
};


/**
 * @param {!proto.neptune.FindUserByUsernameRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.neptune.FindUserByUsernameResponse>}
 *     Promise that resolves to the response
 */
proto.neptune.UsersPromiseClient.prototype.findUserByUsername =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/neptune.Users/FindUserByUsername',
      request,
      metadata || {},
      methodDescriptor_Users_FindUserByUsername);
};


module.exports = proto.neptune;

