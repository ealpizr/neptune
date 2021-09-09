<div class="sidebar--userinfo">
  <img src="/img1.png" />
  <h2>John Doe</h2>
  <div class="icon-container">
    <span class="logout-icon"></span>
  </div>
</div> 

<style>
  .sidebar--userinfo {
    background-color: #0F131A;
    width: 100%;
    height: 10%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: stretch;
  } 

  .sidebar--userinfo img {
    max-width: 70%;
    max-height: 70%;
    margin: 0 2em;
  }

  .sidebar--userinfo h2 {
    color: white;
    flex: 1;
    width: 100%;
    font-size: 1.8rem;
  }

  .sidebar--userinfo .icon-container {
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .sidebar--userinfo span {
    width: 100%;
    height: 100%;
    max-width: 30px;
    background-image: url('/logout-icon.svg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    cursor: pointer;
  }
</style>