<script lang="ts">
  function scroll(dir: number) {
    const el = document.querySelector("main");
    if (!el) return;
    el.scrollTo(dir * window.innerWidth, 0)
  }
</script>

<footer>
  <nav>
    <button on:click={() => scroll(0)}>Schedule</button>
    <button on:click={() => scroll(1)}>Information</button>
  </nav>
</footer>

<style lang="scss">
  footer {
    display: flex;
    align-items: center;
    background-color: #f5fff1;
    border-top: 3px solid #011627;
    height: 5rem;
    width: 100%;

    @media (min-width: 850px) {
      display: none;
    }
  }

  nav {
    display: flex;
    column-gap: 1rem;
    align-items: center;
    justify-content: center;
    flex: 1 1;
    padding: 0.5rem 2rem;
  }

  button {
    appearance: none;
    background-color: transparent;
    border: 1px solid #011627;
    border-radius: 1.5rem;
    box-sizing: border-box;
    cursor: pointer;
    font-family: inherit;
    font-size: 0.8rem;
    height: 3rem;
    width: 30%;
  }
</style>