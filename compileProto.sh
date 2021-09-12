#!/bin/sh

protoc                                                      \
                                                             \
--go_out=server                                               \
--go_opt=paths=source_relative                                 \
--go-grpc_out=server                                            \
--go-grpc_opt=paths=source_relative                              \
                                                                  \
--js_out=import_style=commonjs:web/src                             \
--grpc-web_out=import_style=commonjs,mode=grpcwebtext:web/src       \
                                                                     \
proto/*.proto