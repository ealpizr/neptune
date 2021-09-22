<script>
import ChatContactInfo from "./components/ChatContactInfo.svelte";
import ChatMessage from "./components/ChatMessage.svelte";
import Sidebar from "./components/Sidebar.svelte";
import {onMount} from 'svelte'
import {useNavigate} from "svelte-navigator"
import {getCurrentUser} from './controllers/users'
import {getChatMessages, getChats, sendMessage as sm} from './controllers/chats'

const navigate = useNavigate()
let isMenuOpened = false
let refreshToken = window.localStorage.getItem("refreshToken")
let accessToken = window.sessionStorage.getItem("accessToken")
let message = ""
let receiverId = ""
let user = {}
let chats = []
let messages = []

const sendMessage = () => {
  sm(accessToken, receiverId, message).then(() => message = "")
}

const onActiveChatChange = id => {
  console.log("active chat has changed, id: ", id.detail.id)
  receiverId = id.detail.id
  const msgStream = getChatMessages(accessToken, receiverId)
  msgStream.on('data', response => {
    messages.push(response.toObject())
    messages = messages
  })
  msgStream.on('end', () => {
    console.log('stream ended')
  })
}

onMount(async () => {
  if (!refreshToken) {
    return navigate("/login")
  } 

  user = await getCurrentUser(accessToken)
  chats = await getChats(accessToken)

  console.log(user)
  console.log(chats)
})

</script>

<div class="wrapper">

  <Sidebar FullScreen={isMenuOpened} activeId={receiverId} on:closeMenu={e => isMenuOpened = false} username={user?.username} chats={chats} on:changeActiveChat={onActiveChatChange}/>

  <main class="main">

    <!-- <ChatContactInfo on:openMenu={e => isMenuOpened = true}/> -->

    <div class="main--chat">
      <!-- TODO: custom scroll -->
      {#if !receiverId}
      <h3>Open a chat to see the messages</h3>
      {:else}
        {#each messages as m}
          <ChatMessage Content={m.content} Timestamp={m.timestamp.seconds} Type="{m.sender == receiverId ? "received" : "sent"}" />
        {/each}
      {/if}
    </div>

    <div class="main--input">
      <input type="text" placeholder="Type a message..." bind:value={message}>
      <div class="test">
        <span class="image-icon"></span>
        <span class="send-icon" on:click={sendMessage}></span>
      </div>
    </div>
  </main>
</div>

<style>

  .main--chat h3 {
    color: var(--clr-std);
    font-size: 2.4rem;
    align-self: center;
  }

  .wrapper {
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
  }

  .main {
    width: 100%;
    background-color: #1A1F2B;
    display: flex;
    flex-direction: column;
  }

  .main--chat {
    height: 100%;
    padding: 3em;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
  }

  .main--input {
    height: 8%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding: 4em 3em;
  }

  .main--input input {
    border: none;
    font-size: 1.8rem;
    background-color: #3F4447;
    width: 100%;
    height: 35px;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    padding: 0 .5em;
    color: white;
    outline: none;
  }


  .test {
    width: 80px;
    height: 35px;
    background-color: #3F4447;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  .image-icon {
    background-image: url('/image-icon.svg');
    background-repeat: no-repeat;
    background-size: contain;
    width: 60%;
    height: 60%;
    cursor: pointer;
  }

  .send-icon {
    background-image: url('/send-icon.svg');
    background-repeat: no-repeat;
    background-size: contain;
    width: 60%;
    height: 60%;
    cursor: pointer;
  }
</style>