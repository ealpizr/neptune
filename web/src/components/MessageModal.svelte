<script>
  export let Type, Text
</script>

<div class="modal-container {Type}">
  <p class="modal-text {Type}">{Text}</p>
</div>

<style>
  .modal-container {
    margin-top: 2em;
    padding: 2em 3em;
    border-radius: 12px;
  }

  .modal-text {
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
  }

  .error {
    color: var(--clr-std);
    background-color: var(--clr-accent-red);
  }

  .success {
    color: var(--clr-primary);
    background-color: green;
  }
</style>