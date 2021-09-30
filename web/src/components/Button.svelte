<script>
  export let Text;
</script>

<input type="submit" value={Text} on:click />

<style>
  input {
    margin-top: 3em;
    border: none;
    border-radius: 4px;
    background-color: var(--clr-accent-blue);
    color: var(--clr-primary);
    font-size: 2rem;
    font-weight: 700;
    width: 50%;
    height: 5rem;
    align-self: center;
    cursor: pointer;
  }

  input:hover {
    background-color: #006aa1;
  }
</style>
