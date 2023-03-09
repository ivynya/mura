<script lang="ts">
	import InfoBar from "../InfoBar.svelte";
	import Picker from "../Picker.svelte";
  import { mura, user } from "../../lib/mura";
	import type { PageData } from "./$types";

	$: $mura.participants[$mura.participants.findIndex(u => u.name === $user.name)] = $user;
	
	export let data: PageData;
	$: $mura = data.mura;
</script>

<Picker />
<InfoBar />

<style lang="scss">
</style>
