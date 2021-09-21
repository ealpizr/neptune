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

const sendMessage = (accessToken, receiverId, content) => {
  return new Promise((resolve, reject) => {
    const request = new proto.neptune.SendMessageRequest()
    request.setReceiver(receiverId)
    request.setContent(content)
    client
      .sendMessage(request, { authorization: accessToken })
      .then(() => resolve())
      .catch(e => {
        console.log(e)
        reject(e)
      })
  })
}

const getChatMessages = (accessToken, receiverId) => {
  const request = new proto.neptune.GetChatMessagesRequest()
  request.setReceiverid(receiverId)
  return client.getChatMessages(request, { authorization: accessToken })
}

export { getChats, sendMessage, getChatMessages }
