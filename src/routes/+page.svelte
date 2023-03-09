<script lang="ts">
	import Header from "./Header.svelte";
	import InfoBar from "./InfoBar.svelte";
	import Picker from "./Picker.svelte";
  import { mura, user } from "../lib/mura";

	$: $mura.participants[$mura.participants.findIndex(u => u.name === $user.name)] = $user;
</script>

<div class="app">
  <Header />
	<main>
    <Picker />
    <InfoBar />
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
