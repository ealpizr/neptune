<script>
import SidebarChatList from './SidebarChatList.svelte';
import SidebarUserInfo from './SidebarUserInfo.svelte';
</script>

<section class="sidebar">
  <SidebarUserInfo />
  <SidebarChatList />
</section>

<style>
  .sidebar {
    width: 30%;
    background-color: #141821;
  }
</style>