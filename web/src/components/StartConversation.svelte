<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type {User} from '../proto/neptune_pb'
  const dispatch = createEventDispatcher();
  export let userSearchResults: Array<User>;

  const startNewConversation = (user: User) => {
    dispatch("changeActiveChat", {user})
  }
</script>

<h3>Start a new chat with:</h3>
{#each userSearchResults as u}
  <div class="wrapper" on:click = {() => startNewConversation(u)}>
    <p>{u.getUsername()}</p>
  </div>
{/each}

<style>
  h3 {
    color: var(--clr-std);
    font-size: 1.8rem;
    font-weight: 700;
  }

  .wrapper {
    cursor: pointer;
    margin-top: 5px;
    padding: 1em;
    width: 100%;
    background-color: var(--clr-secondary);
    max-height: 150px;
    display: flex;
    align-items: center;
  }

  .wrapper p {
    color: var(--clr-std);
    font-size: 1.6rem;
  }
</style>
