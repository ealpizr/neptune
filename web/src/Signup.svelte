<script>
  import UserInput from './components/UserInput.svelte'
  import Button from './components/Button.svelte'
</script>

<div class="container">
  <h1>NEPTUNE</h1>

  <form>
    <div>
      <UserInput For="Email" Type="email" />
      <UserInput For="Username"/>
      <UserInput For="Password" Type="password"/>
      <UserInput For="Confirm password" Type="password" ID="passwordConfirmation" />
    </div>
    <Button Text="SIGN UP"/>
  </form>

  <a href="#" class="text-center">
  <p>Don't have an account?</p>
  <p>Create one!</p>
  </a>
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
  }

  a:hover {
    text-decoration: underline;
    color: #006AA1;
  }
  
</style>