<script>
import SidebarChatList from './SidebarChatList.svelte';
import SidebarUserInfo from './SidebarUserInfo.svelte';

export let FullScreen = false

</script>

<section class="{FullScreen ? "sidebar--fullscreen" : "sidebar"}">
  <SidebarUserInfo />
  <SidebarChatList />
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
  }

  @media screen and (max-width: 768px) {
    .sidebar {
      display: none;
    }
  }
</style>