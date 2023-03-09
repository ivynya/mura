<script lang="ts">
	import type { Mura } from "../lib/mura";
	import PickerHour from "./PickerHour.svelte";

  export let mura: Mura;
  export let date: string;
  export let row: number;

  export let del: boolean;
  export let firstCorner: [number, number];
  export let secondCorner: [number, number];

  $: from = new Date(mura.time_from).getUTCHours();
  $: to = new Date(mura.time_to).getUTCHours() - from < 0 ? 24 + new Date(mura.time_to).getUTCHours() - from : new Date(mura.time_to).getUTCHours() - from;

  // Converts a displayed hour index (i + from) in UTC to
  // local time zone hours, in 24 hour format (0-23)
  function localizeHour(index: number) {
    const hour = index + from;
    const utc = new Date();
    utc.setUTCHours(hour);
    return utc.getHours();
  }

  // TODO: Move this into a service
  let refresh = 0;
</script>

<div class="picker">
  {#each Array(to + 1) as _, i (refresh*24 + i)}
    <PickerHour {mura}
      {date}
      {row}
      hour={i + from}
      hourLocalized={localizeHour(i)}
      {del}
      {firstCorner}
      {secondCorner}
      on:mousedown on:mouseenter on:mouseup />
  {/each}
</div>

<style lang="scss">
  .picker {
    display: flex;
    flex: 1 1;

    :global(button.userSelected + button.userSelected::before) {
      border-radius: 0.5rem;
      left: -2rem;
      margin: auto 0;
      width: 60px;
      z-index: 1;
    }
  }
</style>