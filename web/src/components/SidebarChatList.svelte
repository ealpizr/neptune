<script>
import { findUserByUsername } from '../controllers/users';

    import ChatListItem from './ChatListItem.svelte'
    import StartConversation from './StartConversation.svelte';
    export let chats = []
    export let activeId
    
    let searchDelay
    let searchInputValue = ""
    let searchResults
    const handleSearch = () => {
      clearTimeout(searchDelay)
      searchDelay = setTimeout(() => {
        findUserByUsername(searchInputValue)
        .then(u => searchResults = u)
      }, 500)
    }
</script>

<div class="sidebar--chatlist">
    
  <h2 class="header">Chats</h2>
  <div class="input">
    <input type="text" placeholder="Search..." bind:value={searchInputValue} on:input={handleSearch}>
    <div class="icon"><span></span></div>
  </div>

  {#if searchResults?.id}
    <StartConversation user={searchResults} on:changeActiveChat />
  {:else if searchInputValue}
    <p class="not-found">User {searchInputValue} not found</p>
  {/if}

  {#each chats as c}
  <ChatListItem chat={c} activeId={activeId} on:changeActiveChat/>
  {/each}

  {#if chats.length == 0 && !searchInputValue}
  <p class="find-people">Use the search box to find people</p>
  {/if}

</div>

<style>
  .not-found {
    color: var(--clr-accent-red);
    font-size: 1.8rem;
    font-weight: 700;
    text-align: center;
  }

  .find-people {
    color: var(--clr-std);
    font-size: 1.8rem;
    font-weight: 700;
    text-align: center;
  }

  .header {
    color: var(--clr-std);
    font-size: 2rem;
    margin: 1em 0 0.5em 0.5em;
  }

  .input {
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 0 1em;
    margin-bottom: 2em;
  }

  input {
    border: none;
    height: 35px;
    font-size: 1.4rem;
    width: 100%;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    padding: 0 1em;
    background-color: var(--clr-secondary);
    outline: none;
    color: var(--clr-std);
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 35px;
    background-color: var(--clr-secondary);
    width: 30px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    padding-right: 1em;
  }

  .icon span {
    display: block;
    background-image: url('/search-icon.svg');
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
  }
</style>