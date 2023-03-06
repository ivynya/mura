<script lang="ts">
	import Header from "./Header.svelte";
	import InfoBar from "./InfoBar.svelte";
	import Picker from "./Picker.svelte";
  import { mura } from "../lib/mura";
</script>

<div class="app">
  <Header />
	<main>
    <Picker bind:mura={$mura} />
    <InfoBar bind:mura={$mura} />
	</main>
</div>

<style lang="scss">
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
