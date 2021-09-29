// package: neptune
// file: proto/users.proto

var proto_users_pb = require("../proto/users_pb");
var google_protobuf_empty_pb = require("google-protobuf/google/protobuf/empty_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Users = (function () {
  function Users() {}
  Users.serviceName = "neptune.Users";
  return Users;
}());

Users.GetMyUser = {
  methodName: "GetMyUser",
  service: Users,
  requestStream: false,
  responseStream: false,
  requestType: google_protobuf_empty_pb.Empty,
  responseType: proto_users_pb.MyUserResponse
};

Users.FindUserByUsername = {
  methodName: "FindUserByUsername",
  service: Users,
  requestStream: false,
  responseStream: false,
  requestType: proto_users_pb.FindUserByUsernameRequest,
  responseType: proto_users_pb.FindUserByUsernameResponse
};

exports.Users = Users;

function UsersClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

UsersClient.prototype.getMyUser = function getMyUser(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Users.GetMyUser, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

UsersClient.prototype.findUserByUsername = function findUserByUsername(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Users.FindUserByUsername, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.UsersClient = UsersClient;

