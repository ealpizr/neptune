<script>
  export let Type;
  export let Content;
  export let Timestamp;
</script>

<div class="container">
  <div class="message {Type}">
    <p>
      {Content}
    </p>
  </div>
  <p class="timestamp {Type}">{Timestamp}</p>
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

  @media screen and (max-width: 1024px) {
    .message {
      width: 70%;
    }
  }

</style>