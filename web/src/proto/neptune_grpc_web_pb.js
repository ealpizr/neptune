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
proto.neptune = require('./neptune_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.neptune.GreeterClient =
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
proto.neptune.GreeterPromiseClient =
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
 *   !proto.neptune.GreetingRequest,
 *   !proto.neptune.GreetingResponse>}
 */
const methodDescriptor_Greeter_GreetMe = new grpc.web.MethodDescriptor(
  '/neptune.Greeter/GreetMe',
  grpc.web.MethodType.UNARY,
  proto.neptune.GreetingRequest,
  proto.neptune.GreetingResponse,
  /**
   * @param {!proto.neptune.GreetingRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.neptune.GreetingResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.neptune.GreetingRequest,
 *   !proto.neptune.GreetingResponse>}
 */
const methodInfo_Greeter_GreetMe = new grpc.web.AbstractClientBase.MethodInfo(
  proto.neptune.GreetingResponse,
  /**
   * @param {!proto.neptune.GreetingRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.neptune.GreetingResponse.deserializeBinary
);


/**
 * @param {!proto.neptune.GreetingRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.neptune.GreetingResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.neptune.GreetingResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.neptune.GreeterClient.prototype.greetMe =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/neptune.Greeter/GreetMe',
      request,
      metadata || {},
      methodDescriptor_Greeter_GreetMe,
      callback);
};


/**
 * @param {!proto.neptune.GreetingRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.neptune.GreetingResponse>}
 *     Promise that resolves to the response
 */
proto.neptune.GreeterPromiseClient.prototype.greetMe =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/neptune.Greeter/GreetMe',
      request,
      metadata || {},
      methodDescriptor_Greeter_GreetMe);
};


module.exports = proto.neptune;

