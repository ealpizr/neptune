<div class="container">
  <img class="contact-image" src="/img2.png" alt="Jane Doe's profile picture">
  <div class="chatinfo-container">
    <h3 class="contact-name">Jane Doe</h3>
    <p class="message-content">Lorem ipsum dolor sit amet, consectetur</p>
  </div>
  <p class="message-time">10:54</p>
</div>

<style>
  .container {
    background-color: #262C39;
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
  
</style>