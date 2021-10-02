<script lang="ts">
  import ChatContactInfo from './components/ChatContactInfo.svelte'
  import ChatMessage from './components/ChatMessage.svelte'
  import Sidebar from './components/Sidebar.svelte'
  import { onMount } from 'svelte'
  import { useNavigate } from 'svelte-navigator'

  import { grpc } from '@improbable-eng/grpc-web'
  import { Packet, Type, User, SendMessageRequest, Message, Chat } from './proto/neptune_pb'
  import { Neptune } from './proto/neptune_pb_service'
  import pb from 'google-protobuf/google/protobuf/empty_pb'
  import timestamp from 'google-protobuf/google/protobuf/timestamp_pb'

  import cfg from '../config.json'

  const navigate = useNavigate()
  let isMenuOpened = false
  let refreshToken = window.localStorage.getItem('refreshToken')
  let accessToken = window.sessionStorage.getItem('accessToken')
  let currentUser: User = new User()
  let remoteUser: User = new User()

  let message = ''
  let activeChat: { messages: Array<Message> } = { messages: [] }

  let userSearchResults: Array<User> = []
  let chats: Array<Chat> = []

  onMount(async () => {
    if (!refreshToken) {
      return navigate('/login')
    }

    grpc.invoke(Neptune.Connect, {
      host: cfg.serverUrl,
      request: new pb.Empty(),
      metadata: { authorization: accessToken },
      onMessage: (p: Packet) => {
        console.log(`packet has been received, type ${p.getType()}`)
        console.log(`packet content is ${p}`)
        switch (p.getType()) {
          case Type.CURRENT_USER:
            currentUser = p.getCurrentuser()
            break
          case Type.USER_LIST:
            userSearchResults = p.getUserlistList()
            break
          case Type.MESSAGE_ITEM:
            activeChat.messages.push(p.getMessageitem())
            activeChat = activeChat
            break
          case Type.CHAT_ITEM:
            console.log(`chat item received: data ${p.getChatitem()}`)
            chats.push(p.getChatitem())
            chats = chats
            break
        }
      },
      onEnd: (code: grpc.Code, message: string) => {
        console.log(`stream ended with code ${code} and message ${message}`)
      },
    })

    grpc.unary(Neptune.GetCurrentUser, {
      host: cfg.serverUrl,
      request: new pb.Empty(),
      metadata: {
        authorization: accessToken,
      },
      onEnd: () => {
        console.log('unary call for request current user invoked')
      },
    })
  })

  const toggleMenu = () => {
    isMenuOpened = !isMenuOpened
  }

  const changeActiveChat = (e) => {
    remoteUser = e.detail
    console.log(activeChat.messages)
  }

  const sendMessage = () => {
    const request = new SendMessageRequest()
    const msg = new Message()
    msg.setContent(message)
    msg.setSenderid(currentUser.getId())
    msg.setTimestamp(new timestamp.Timestamp())
    request.setMessage(msg)
    request.setRemoteuserid(remoteUser.getId())
    grpc.unary(Neptune.SendMessage, {
      host: cfg.serverUrl,
      request,
      metadata: {
        authorization: accessToken
      },
      onEnd: () => {
        message = ""
      }
    })
  }
</script>

<div class="wrapper">
  <Sidebar FullScreen={isMenuOpened} {currentUser} {chats} on:toggleMenu={toggleMenu} on:changeActiveChat={changeActiveChat} {userSearchResults} username={currentUser.getUsername()} />

  <main class="main">
    <ChatContactInfo {remoteUser} on:toggleMenu={toggleMenu} />
    <div class="main--chat">
      <!-- TODO: custom scroll -->
      {#if !remoteUser}
        <h3>Open a chat to see the messages</h3>
      {:else}
        {#each activeChat.messages as m}
          <ChatMessage
            Content={m.getContent()}
            Timestamp={m.getTimestamp()}
            Type={m.getSenderid() == remoteUser.getId() ? 'received' : 'sent'}
          />
        {/each}
      {/if}
    </div>

    <div class="main--input">
      <input type="text" placeholder="Type a message..." bind:value={message} />
      <div class="test">
        <span class="image-icon" />
        <span class="send-icon" on:click={sendMessage} />
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
    background-color: #1a1f2b;
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
    background-color: #3f4447;
    width: 100%;
    height: 35px;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    padding: 0 0.5em;
    color: white;
    outline: none;
  }

  .test {
    width: 80px;
    height: 35px;
    background-color: #3f4447;
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
