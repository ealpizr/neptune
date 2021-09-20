import { UsersPromiseClient } from '../proto/users_grpc_web_pb'
const client = new UsersPromiseClient('http://localhost:3000')

const getCurrentUser = accessToken => {
  return new Promise((resolve, reject) => {
    client
      .getMyUser(new proto.google.protobuf.Empty(), {
        authorization: accessToken,
      })
      .then(u => resolve(u.toObject()))
      .catch(e => {
        console.log(e)
        reject({})
      })
  })
}

const findUserByUsername = username => {
  return new Promise((resolve, reject) => {
    const req = new proto.neptune.FindUserByUsernameRequest()
    req.setUsername(username)
    client
      .findUserByUsername(req, {})
      .then(u => resolve(u.toObject()))
      .catch(e => {
        console.log(e)
        reject(e)
      })
  })
}

const logout = navigate => {
  window.localStorage.removeItem('refreshToken')
  window.sessionStorage.removeItem('accessToken')
  navigate('/login')
}

export { getCurrentUser, findUserByUsername, logout }
