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

const proto = {};
proto.neptune = require('./auth_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.neptune.AuthClient =
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
proto.neptune.AuthPromiseClient =
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
 *   !proto.neptune.SignUpRequest,
 *   !proto.neptune.SignUpResponse>}
 */
const methodDescriptor_Auth_SignUp = new grpc.web.MethodDescriptor(
  '/neptune.Auth/SignUp',
  grpc.web.MethodType.UNARY,
  proto.neptune.SignUpRequest,
  proto.neptune.SignUpResponse,
  /**
   * @param {!proto.neptune.SignUpRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.neptune.SignUpResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.neptune.SignUpRequest,
 *   !proto.neptune.SignUpResponse>}
 */
const methodInfo_Auth_SignUp = new grpc.web.AbstractClientBase.MethodInfo(
  proto.neptune.SignUpResponse,
  /**
   * @param {!proto.neptune.SignUpRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.neptune.SignUpResponse.deserializeBinary
);


/**
 * @param {!proto.neptune.SignUpRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.neptune.SignUpResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.neptune.SignUpResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.neptune.AuthClient.prototype.signUp =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/neptune.Auth/SignUp',
      request,
      metadata || {},
      methodDescriptor_Auth_SignUp,
      callback);
};


/**
 * @param {!proto.neptune.SignUpRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.neptune.SignUpResponse>}
 *     Promise that resolves to the response
 */
proto.neptune.AuthPromiseClient.prototype.signUp =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/neptune.Auth/SignUp',
      request,
      metadata || {},
      methodDescriptor_Auth_SignUp);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.neptune.LoginRequest,
 *   !proto.neptune.LoginResponse>}
 */
const methodDescriptor_Auth_Login = new grpc.web.MethodDescriptor(
  '/neptune.Auth/Login',
  grpc.web.MethodType.UNARY,
  proto.neptune.LoginRequest,
  proto.neptune.LoginResponse,
  /**
   * @param {!proto.neptune.LoginRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.neptune.LoginResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.neptune.LoginRequest,
 *   !proto.neptune.LoginResponse>}
 */
const methodInfo_Auth_Login = new grpc.web.AbstractClientBase.MethodInfo(
  proto.neptune.LoginResponse,
  /**
   * @param {!proto.neptune.LoginRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.neptune.LoginResponse.deserializeBinary
);


/**
 * @param {!proto.neptune.LoginRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.neptune.LoginResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.neptune.LoginResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.neptune.AuthClient.prototype.login =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/neptune.Auth/Login',
      request,
      metadata || {},
      methodDescriptor_Auth_Login,
      callback);
};


/**
 * @param {!proto.neptune.LoginRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.neptune.LoginResponse>}
 *     Promise that resolves to the response
 */
proto.neptune.AuthPromiseClient.prototype.login =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/neptune.Auth/Login',
      request,
      metadata || {},
      methodDescriptor_Auth_Login);
};


module.exports = proto.neptune;

