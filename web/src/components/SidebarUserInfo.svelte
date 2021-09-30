<script>
  import { createEventDispatcher } from 'svelte'
  import { useNavigate } from 'svelte-navigator'
  const dispatch = createEventDispatcher()
  const navigate = useNavigate()

  export let username
</script>

<div class="sidebar--userinfo">
  <div class="close-icon-container">
    <span class="close-icon" on:click={() => dispatch('closeMenu')} />
  </div>
  <div class="userinfo-container">
    <img src="/img1.png" />
    <h2>{username}</h2>
  </div>
  <div class="icon-container">
    <span on:click={() => console.log('logout')} class="logout-icon" />
  </div>
</div>

<style>
  .sidebar--userinfo {
    background-color: #0f131a;
    width: 100%;
    height: 10%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    min-height: 60px;
  }

  .sidebar--userinfo img {
    max-width: 70%;
    max-height: 70%;
    margin: 0 2em;
  }

  .sidebar--userinfo h2 {
    outline: none;
    color: white;
    font-size: 1.8rem;
  }

  .userinfo-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }

  .sidebar--userinfo .icon-container {
    width: 30px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 2em;
  }

  .logout-icon {
    width: 100%;
    height: 100%;
    max-width: 30px;
    background-image: url('/logout-icon.svg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    cursor: pointer;
  }

  .close-icon-container {
    display: none;
    margin-left: 2em;
    width: 30px;
    height: 100%;
  }

  .close-icon {
    display: block;
    background-image: url('/close-icon.svg');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    width: 100%;
    height: 100%;
  }

  @media screen and (max-width: 768px) {
    .close-icon-container {
      display: block;
    }

    .userinfo-container {
      align-self: center;
    }

    .sidebar--userinfo img {
      margin: 0;
      margin-right: 1em;
    }
  }
</style>
