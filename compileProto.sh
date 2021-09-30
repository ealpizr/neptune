#!/bin/sh

protoc                                                      \
                                                             \
--go_out=server                                               \
--go_opt=paths=source_relative                                 \
--go-grpc_out=server                                            \
--go-grpc_opt=paths=source_relative                              \
                                                                  \
--plugin="/usr/bin/protoc-gen-ts"                                  \
--js_out=import_style=commonjs:web/src                              \
--ts_out=service=grpc-web:web/src                                    \
                                                                       \
proto/*.proto