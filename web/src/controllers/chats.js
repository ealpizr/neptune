import { ChatsPromiseClient } from '../proto/chats_grpc_web_pb'

const client = new ChatsPromiseClient('http://localhost:3000')

const getChats = accessToken => {
  return new Promise((resolve, reject) => {
    client
      .getUserChats(new proto.google.protobuf.Empty(), {
        authorization: accessToken,
      })
      .then(c => resolve(c.toObject().chatsList))
      .catch(e => {
        console.log(e)
        reject({})
      })
  })
}

export { getChats }
