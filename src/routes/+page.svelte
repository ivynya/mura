<script lang="ts">
	import InfoBar from "./InfoBar.svelte";
	import Picker from "./Picker.svelte";
  import { mura, user } from "../lib/mura";

	$: $mura.participants[$mura.participants.findIndex(u => u.name === $user.name)] = $user;
</script>

<Picker />
<InfoBar />

<style lang="scss">
</style>
