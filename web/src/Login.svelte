<script>
  import UserInput from './components/UserInput.svelte'
  import Button from './components/Button.svelte'
  import {Link, useLocation, useNavigate} from 'svelte-navigator'
  import {AuthClient} from './proto/auth_grpc_web_pb'
  import MessageModal from './components/MessageModal.svelte'
  const location = useLocation()
  const navigate = useNavigate()

  let [username, password, error] = ["", "", ""]

  const refreshToken = window.localStorage.getItem("refreshToken")
  if (refreshToken) {
    navigate("/")
  }

  const Login = () => {

    if (username == "") {
      return error = "invalid username"
    }

    if (password == "") {
      return error = "invalid password"
    }

    const client = new AuthClient("http://localhost:3000")

    const req = new proto.neptune.LoginRequest()
    req.setUsername(username)
    req.setPassword(password)

    client.login(req, {}, (err, res) => {
      if (err) {
        return error = err.message
      }
      const tokens = res.toObject()
      window.localStorage.setItem("refreshToken", tokens.refreshtoken)
      window.sessionStorage.setItem("accessToken", tokens.accesstoken)
      navigate("/")
    })
  }

</script>

<div class="container">
  <h1>NEPTUNE</h1>

  {#if $location.state?.showModal}
    <MessageModal Type="success" Text="account created successfully" />
  {/if}

  {#if error}
  <MessageModal Type="error" Text={error} />
  {/if}

  <form on:submit|preventDefault={Login} on:change={() => {if (error) error = ""}}>
    <div>
      <UserInput For="Username" bind:value={username} />
      <UserInput For="Password" Type="password" bind:value={password} />
    </div>
    <a href="/">Forgot your password?</a>
    <Button Text="LOGIN" />
  </form>

  <Link to="/signup">
    <a href="/signup" class="text-center">
      <p>Don't have an account?</p>
      <p>Create one!</p>
      </a>
  </Link>
</div>

<style>
  .container {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 0 2em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--clr-primary);
  }

  h1 {
    font-size: 5.6rem;
    color: var(--clr-std);
    letter-spacing: 0.3em;
    margin-left: 0.3em;
    outline: none;
  }

  form {
    width: 100%;
    flex: 1;
    max-height: 500px;
    max-width: 350px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  form div {
    display: flex;
    flex-direction: column;
    flex: 1;
    max-height: 150px;
    justify-content: space-between;
    margin-bottom: 1em;
  }
  
  a {
    flex: 0;
    color: var(--clr-accent-blue);
    text-decoration: none;
    font-size: 1.4rem;
    letter-spacing: 0.08em;
    display: block;
    font-weight: 700;
  }

  a:hover {
    text-decoration: underline;
    color: #006AA1;
  }
  
</style>