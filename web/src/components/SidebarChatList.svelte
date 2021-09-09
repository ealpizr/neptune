<script>
    import ChatListItem from './ChatListItem.svelte'
</script>

<div class="sidebar--chatlist">
    
  <h2 class="header">Chats</h2>
  <div class="input">
    <input type="text" placeholder="Search...">
    <div class="icon"><span></span></div>
  </div>

  <ChatListItem />

</div>

<style>
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