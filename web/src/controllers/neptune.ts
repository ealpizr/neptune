import { NeptuneClient } from '../proto/neptune_pb_service'
import { Packet, TestRequest } from '../proto/neptune_pb'
import Empty from 'google-protobuf/google/protobuf/empty_pb.js'

const client: NeptuneClient = new NeptuneClient('http://localhost:3000')

const connect = (accessToken: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const req = new Empty()
    client
      .connect(req, { authorization: accessToken })
      .on('data', (p: Packet) => {
        console.log('received packet from server')
        console.log(p.toObject())
      })
  })
}

const sendTest = (accessToken: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const req = new TestRequest()
    req.setMessage('This message was sent from Typescript :)')
    client.test(req, { authorization: accessToken }, () => {
      resolve()
    })
  })
}

export { connect, sendTest }
