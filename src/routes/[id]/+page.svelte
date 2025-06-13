<script lang="ts">
	import { run } from 'svelte/legacy';

	import InfoBar from "../InfoBar.svelte";
	import Picker from "../Picker.svelte";
  import { mura, user } from "../../lib/mura";
	import type { PageData } from "./$types";

	run(() => {
		$mura.participants[$mura.participants.findIndex(u => u.name === $user.name)] = $user;
	});
	
	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	run(() => {
		$mura = data.mura;
	});
</script>

<Picker />
<InfoBar />

<style lang="scss">
</style>
