<script lang="ts">
	import Header from "./Header.svelte";
</script>

<div class="app">
  <Header />
	<main>
  <slot></slot>
  </main>
</div>

<style lang="scss" global>
  :global(body) {
		background: #011627;
		color: #f5fff1;
    font-family: "cartograph-cf", serif;

    height: 100vh;
    margin: 0;
    padding: 0;
  }
  
	.app {
		display: flex;
		flex-direction: column;
		height: 100vh;
	}

	main {
		display: flex;
		flex: 1 1;
	}
</style>