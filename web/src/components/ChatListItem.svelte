<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let activeId;
  export let chat;
</script>

<div
  class="container {activeId == chat?.receiverid && 'active'}"
  on:click={() => dispatch("changeActiveChat", { chat: chat })}
>
  <img class="contact-image" src="/img2.png" alt="Jane Doe's profile picture" />
  <div class="chatinfo-container">
    <h3 class="contact-name">{chat?.user}</h3>
    <p class="message-content">{chat?.message.content}</p>
  </div>
  <p class="message-time">10:54</p>
</div>

<style>
  .active {
    background-color: #262c39;
  }

  .container {
    width: 100%;
    height: 80px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .contact-image {
    border-radius: 50%;
    width: 50px;
    margin: 0 1em;
  }

  .chatinfo-container {
    flex: 1;
    display: flex;
    height: 35px;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
  }

  .contact-name {
    color: var(--clr-std);
    font-size: 1.6rem;
  }

  .message-content {
    color: var(--clr-std);
    font-size: 1.2rem;
    overflow: hidden;
    line-height: 1.5em;
  }

  .message-time {
    color: var(--clr-std);
    font-size: 1rem;
    margin: 1.8em 1em 0;
  }

  @media screen and (max-width: 768px) {
    .container {
      height: 100px;
    }
  }
</style>
