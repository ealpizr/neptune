<script lang="ts">
  import ChatListItem from './ChatListItem.svelte'
  import StartConversation from './StartConversation.svelte'
  import {createEventDispatcher} from 'svelte'

  import {grpc} from "@improbable-eng/grpc-web"
  import {FindUserByUsernameRequest, Chat} from '../proto/neptune_pb'
  import {Neptune} from '../proto/neptune_pb_service'

  import cfg from '../../config.json'

  export let chats: Array<Chat>
  export let activeId
  export let userSearchResults
  export let currentUser

  let searchDelay
  let searchInputValue = ''

  const dispatch = createEventDispatcher()

  const handleSearch = () => {
    clearTimeout(searchDelay)
    searchDelay = setTimeout(() => {
      const request = new FindUserByUsernameRequest()
      request.setUsername(searchInputValue)
      grpc.unary(Neptune.FindUserByUsername, {
        host: cfg.serverUrl,
        request,
        metadata: {
          authorization: window.sessionStorage.getItem("accessToken")
        },
        onEnd: (x) => {
          console.log(x)
          console.log("find user request has been sent")
        }
      })
    }, 500)
  }
</script>

<div class="sidebar--chatlist">
  <h2 class="header">Chats</h2>
  <div class="input">
    <input
      type="text"
      placeholder="Search..."
      bind:value={searchInputValue}
      on:input={handleSearch}
    />
    <div class="icon"><span /></div>
  </div>

  {#if userSearchResults.length > 0}
    <StartConversation {userSearchResults} on:changeActiveChat={e => {
      searchInputValue = ""
      userSearchResults = []
      dispatch("changeActiveChat", e.detail.user)      
      }} />
  {:else if searchInputValue}
    <p class="not-found">User {searchInputValue} not found</p>
  {/if}

  {#each chats as c}
    <ChatListItem {currentUser} chat={c} {activeId} on:changeActiveChat />
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
    display: flex;
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
