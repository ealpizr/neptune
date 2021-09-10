<script>
  import {createEventDispatcher} from 'svelte'
  const dispatch = createEventDispatcher()
</script>

<div class="main--contactinfo">
  <div class="menu-icon-container"><span class="menu-icon" on:click={() => dispatch("openMenu")}></span></div>
  <img class="contact-picture" src="/img2.png">
  <div class="contactinfo-container">
    <h3 class="contact-name">Jane Doe</h3>
    <p class="contact-status">Online</p>
  </div>
  <div class="more-icon-container"><span class="more-icon"></span></div>
</div>

<style>

  .menu-icon-container {
    display: none;
    min-width: 25px;
    height: 100%;
    margin-left: 2em;
  }

  .menu-icon {
    display: block;
    background-image: url("/menu-icon.svg");
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }

  .main--contactinfo {
    background-color: #232A38;
    width: 100%;
    min-height: 6rem;
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

  .more-icon-container {
    min-width: 25px;
    height: 100%;
    margin-right: 2em;
  }

  .more-icon {
    display: block;
    width: 100%;
    height: 100%;
    background-image: url("/more-icon.svg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }

  @media screen and (max-width: 768px) {
    .menu-icon-container {
      display:block;
    }
  }
  
</style>