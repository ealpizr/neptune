<script>
import Sidebar from "./components/Sidebar.svelte";
</script>

<div class="wrapper">

  <Sidebar />

  <main class="main">
    <div class="main--contactinfo"></div>
    <div class="main--chat"></div>
    <div class="main--input">
      <input type="text" placeholder="Type a message...">
      <div class="test">
        <span class="image-icon"></span>
        <span class="send-icon"></span>
      </div>
    </div>
  </main>
</div>

<style>
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

  .main--contactinfo {
    background-color: #232A38;
    width: 100%;
    height: 10%;
  }

  .main--chat {
    height: 100%;
  }

  .main--input {
    height: 8%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding: 0 3em;
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
    width: 8%;
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