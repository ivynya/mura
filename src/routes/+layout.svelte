<script lang="ts">
	import Footer from "./Footer.svelte";
	import Header from "./Header.svelte";
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<div id="app">
  <Header />
	<main>
  {@render children?.()}
  </main>
	<Footer />
</div>

<style lang="scss">
  :global(body) {
		background: #011627;
		color: #f5fff1;
    font-family: "cartograph-cf", serif;

    height: 100vh;
    margin: 0;
    padding: 0;
  }
  
	#app {
		display: flex;
		flex-direction: column;
		height: 100vh;
	}

	main {
		display: flex;
		flex: 1 1;

		overflow-x: scroll;
		scroll-snap-type: x mandatory;
		scroll-behavior: smooth;

		@media (max-width: 850px) {
			> :global(*) {
				min-width: 90%;
			}
		}
	}
</style>