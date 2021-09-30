<script lang="ts">
  import UserInput from './components/UserInput.svelte'
  import Button from './components/Button.svelte'
  import MessageModal from './components/MessageModal.svelte'

  import { Link, useLocation, useNavigate } from 'svelte-navigator'
  import { grpc } from '@improbable-eng/grpc-web'
  import { Auth } from './proto/auth_pb_service'
  import { LoginRequest, LoginResponse } from './proto/auth_pb'
  import type { UnaryOutput } from '@improbable-eng/grpc-web/dist/typings/unary'

  const location = useLocation()
  const navigate = useNavigate()

  let [username, password, error] = ['', '', '']
  const refreshToken = window.localStorage.getItem('refreshToken')

  if (refreshToken) {
    navigate('/')
  }
  const Login = () => {
    if (username == '') {
      return (error = 'invalid username')
    }

    if (password == '') {
      return (error = 'invalid password')
    }

    const request = new LoginRequest()
    request.setUsername(username)
    request.setPassword(password)

    grpc.unary(Auth.Login, {
      host: 'http://localhost:3000',
      request,
      onEnd: (r: UnaryOutput<LoginResponse>) => {
        if (r.status != grpc.Code.OK) {
          return (error = 'something went wrong, try again later')
        }
        window.localStorage.setItem('refreshToken', r.message.getRefreshtoken())
        window.sessionStorage.setItem('accessToken', r.message.getAccesstoken())
        navigate('/')
      },
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

  <form
    on:submit|preventDefault={Login}
    on:change={() => {
      if (error) error = ''
    }}
  >
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
    color: #006aa1;
  }
</style>
