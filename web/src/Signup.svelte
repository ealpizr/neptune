<script lang="ts">
  import UserInput from './components/UserInput.svelte'
  import Button from './components/Button.svelte'
  import MessageModal from './components/MessageModal.svelte'

  import { Link, useNavigate } from 'svelte-navigator'

  import { grpc } from '@improbable-eng/grpc-web'
  import { Auth } from './proto/auth_pb_service'
  import { SignUpRequest, SignUpResponse } from './proto/auth_pb'
  import type { UnaryOutput } from '@improbable-eng/grpc-web/dist/typings/unary'

  const navigate = useNavigate()
  let [email, username, password, passwordConfirmation, error] = [
    '',
    '',
    '',
    '',
    '',
    '',
  ]

  const refreshToken = window.localStorage.getItem('refreshToken')
  if (refreshToken) {
    navigate('/')
  }

  const Signup = e => {
    if (email == '') {
      return (error = 'invalid email')
    }

    if (username == '') {
      return (error = 'invalid username')
    }

    if (password == '') {
      return (error = 'invalid password')
    }

    if (password != passwordConfirmation) {
      return (error = 'passwords do not match')
    }

    const request = new SignUpRequest()
    request.setEmail(email)
    request.setUsername(username)
    request.setPassword(password)

    grpc.unary(Auth.SignUp, {
      host: 'http://localhost:3000',
      request,
      onEnd: (r: UnaryOutput<SignUpResponse>) => {
        if (r.status != grpc.Code.OK) {
          return (error = 'something went wrong, try again later')
        }
        navigate('/login', {
          state: {
            showModal: true,
          },
        })
      },
    })
  }
</script>

<div class="container">
  <h1>NEPTUNE</h1>
  {#if error}
    <MessageModal Type="error" Text={error} />
  {/if}
  <form
    on:submit|preventDefault={Signup}
    on:change={() => {
      if (error) error = ''
    }}
  >
    <div>
      <UserInput For="Email" Type="email" bind:value={email} />
      <UserInput For="Username" bind:value={username} />
      <UserInput For="Password" Type="password" bind:value={password} />
      <UserInput
        For="Confirm password"
        Type="password"
        ID="passwordConfirmation"
        bind:value={passwordConfirmation}
      />
    </div>
    <Button Text="SIGN UP" />
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
    color: #006aa1;
  }
</style>
