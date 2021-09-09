<script>
export let For
export let Type = 'text'
export let ID = For.toLowerCase()
</script>

<label for={ID}>
  <span>{For}</span>
   <input type={Type} id={ID}>
</label>

<style>
  span {
    color: var(--clr-std);
    font-size: 1.8rem;
    display: block;
    margin-bottom: 0.6rem;
  }

  input {
    background-color: var(--clr-secondary);
    border: none;
    border-radius: 4px;
    height: 35px;
    color: var(--clr-std);
    font-size: 1.8rem;
    outline: none;
    width: 100%;
    padding: 0 0.5em;
  }

  input:focus {
    background-color: #323739;
  }
</style>