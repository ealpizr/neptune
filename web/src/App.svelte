<script>
  import Login from './Login.svelte'
  import SignUp from './Signup.svelte'
  import Main from './Main.svelte'

  // GRPC
  import {GreeterClient} from "./proto/neptune_grpc_web_pb"
  const client = new GreeterClient("http://localhost:3000")

  const req = new proto.neptune.GreetingRequest()
  req.setName("client")

  client.greetMe(req, {}, (err, res) => {
    if (err) {
      return console.log(err)
    }
    console.log(res.toString())
  })

</script>

<Main />