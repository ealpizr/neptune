<script>
  import {createEventDispatcher} from 'svelte'
  const dispatch = createEventDispatcher()
  export let user
</script>

<div class="wrapper" on:click={() => dispatch("changeActiveChat", {id: user.id})}>
    <div class="container">
      <p>Start a conversation with</p>
    <div>
      <img src="/img1.png" alt="">
      <h3>{user.username}</h3>
    </div>
    </div>
    <div class="icon">-></div>
</div>

<style>
  .icon {
    font-size: 4rem;
    color: var(--clr-accent-blue);
    margin-right: 1em;
  }

  .wrapper {
    cursor: pointer;
    width: 100%;
    background-color: #232A38;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  p {
    color: var(--clr-std);
    font-size: 1.4rem;
    margin: 1em 0;
  }

  .container div {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1em;
    margin-bottom: 1em;
  }

  div h3 {
    color: var(--clr-std);
    font-size: 1.8rem;
  }
</style>