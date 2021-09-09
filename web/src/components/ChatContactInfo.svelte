<div class="main--contactinfo">
  <img class="contact-picture" src="/img2.png">
  <div class="contactinfo-container">
    <h3 class="contact-name">Jane Doe</h3>
    <p class="contact-status">Online</p>
  </div>
  <div class="icon-container"><span class="icon"></span></div>
</div>

<style>
  .main--contactinfo {
    background-color: #232A38;
    width: 100%;
    height: 10%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .contact-picture {
    max-width: 40px;
    margin: 0 2em;
  }

  .contactinfo-container {
    width: 100%;
  }

  .contact-name {
    color: var(--clr-std);
    font-size: 1.5rem;
  }

  .contact-status {
    margin-top: .25em;
    color: var(--clr-accent-blue);
    font-size: 1.2rem;
  }

  .icon-container {
    width: 30px;
    height: 100%;
    margin-right: 2em;
  }

  .icon {
    display: block;
    width: 100%;
    height: 100%;
    background-image: url("/more-icon.svg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }
</style>