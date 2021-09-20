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

const logout = navigate => {
  window.localStorage.removeItem('refreshToken')
  window.sessionStorage.removeItem('accessToken')
  navigate('/login')
}

export { getCurrentUser, logout }
