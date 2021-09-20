<script>
import SidebarChatList from './SidebarChatList.svelte';
import SidebarUserInfo from './SidebarUserInfo.svelte';

export let FullScreen = false
export let username
export let chats = []

</script>

<section class="{FullScreen ? "sidebar--fullscreen" : "sidebar"}">
  <SidebarUserInfo on:closeMenu username={username}/>
  <SidebarChatList chats={chats} on:changeActiveChat/>
</section>

<style>
  section {
    background-color: #141821;
  }

  .sidebar--fullscreen {
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .sidebar {
    width: 30%;
    min-width: 350px;
  }

  @media screen and (max-width: 768px) {
    .sidebar {
      display: none;
    }
  }
</style>