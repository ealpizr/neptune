<script lang="ts">
  import Login from './Login.svelte'
  import Signup from './Signup.svelte'
  import Home from './Home.svelte'
  import { Router, Route } from 'svelte-navigator'
</script>

<Router>
  <Route path="/">
    <Home />
  </Route>

  <Route path="login">
    <Login />
  </Route>

  <Route path="signup">
    <Signup />
  </Route>
</Router>
