<script>
  export let Type;
</script>

<div class="container">
  <div class="message {Type}">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.
    </p>
  </div>
  <p class="timestamp {Type}">10:20</p>
</div>

<style>
  .container {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .message {
    width: 45%;
    max-width: 400px;
    height: fit-content;
    padding: 1em;
    margin-bottom: 1em;
  }

  .message p {
    width: 100%;
    color: var(--clr-std);
    font-size: 1.4rem;
  }

  .sent {
    background-color: var(--clr-accent-blue);
    align-self: flex-end;
  }

  .received {
    background-color: var(--clr-secondary);
    align-self: flex-start;
  }

  .timestamp {
    color: var(--clr-std);
    background-color: transparent;
    font-size: 1.2rem;
    margin-bottom: 1em;
  }

  @media screen and (max-width: 768px) {
    .message {
      width: 70%;
    }
  }

</style>