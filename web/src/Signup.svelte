<script>
  import UserInput from './components/UserInput.svelte'
  import Button from './components/Button.svelte'
  import {AuthClient} from './proto/auth_grpc_web_pb'
  import {Link, useNavigate} from 'svelte-navigator'
import MessageModal from './components/MessageModal.svelte'

  const navigate = useNavigate()
  let [email, username, password, passwordConfirmation, error] = ["", "", "", "", "", ""]  

  const refreshToken = window.localStorage.getItem("refreshToken")
  if (refreshToken) {
    navigate("/")
  }

  const SignUp = e => {

    if (email == "") {
      return error = "invalid email"
    }

    if (username == "") {
      return error = "invalid username"
    }

    if (password == "") {
      return error = "invalid password"
    }

    if (password != passwordConfirmation) {
      return error = "passwords do not match"
    }

    const client = new AuthClient("http://localhost:3000")
    const req = new proto.neptune.SignUpRequest()

    req.setEmail(email)
    req.setUsername(username)
    req.setPassword(password)
    client.signUp(req, {}, (err, res) => {
      if (err) {
        console.log(err)
        return error = err.message
      }
      navigate("/login", {
        state: {
          showModal: true
        }
      })
    })

  }
</script>

<div class="container">
  <h1>NEPTUNE</h1>
  {#if error}
  <MessageModal Type="error" Text={error} />
  {/if}
  <form on:submit|preventDefault={SignUp} on:change={() => {if (error) error=""}}>
    <div>
      <UserInput For="Email" Type="email" bind:value={email} />
      <UserInput For="Username" bind:value={username} />
      <UserInput For="Password" Type="password" bind:value={password} />
      <UserInput For="Confirm password" Type="password" ID="passwordConfirmation" bind:value={passwordConfirmation} />
    </div>
    <Button Text="SIGN UP"/>
  </form>

  <Link to="/login">
    <a href="#" class="text-center">
      <p>Already have an account?</p>
      <p>Login!</p>
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
    margin-top: 1em;
    font-size: 5.6rem;
    color: var(--clr-std);
    letter-spacing: 0.3em;
    margin-left: 0.3em;
    outline: none;
  }

  form {
    width: 100%;
    flex: 1;
    max-height: 550px;
    max-width: 350px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  form div {
    display: flex;
    flex-direction: column;
    flex: 1;
    max-height: 300px;
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
    margin-bottom: 1em;
  }

  a:hover {
    text-decoration: underline;
    color: #006AA1;
  }
  
</style>