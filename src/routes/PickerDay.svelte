<script lang="ts">
	import { mura } from "../lib/mura";
	import PickerHour from "./PickerHour.svelte";
  
  export let row: number;

  export let del: boolean;
  export let firstCorner: [number, number];
  export let secondCorner: [number, number];

  $: from = new Date($mura.time_from).getUTCHours();
  $: toHours = new Date($mura.time_to).getUTCHours();
  $: to = toHours - from < 0 ? 24 + toHours - from : toHours - from;

  // Maps participants into anonymized availability 2D array
  // Formatted as flat number[] for availability on this day
  $: pAvailability = $mura.participants
    .map(p => p.availability[row])
    .map(d => d.times).flat();

  // Converts a displayed hour index (i + from) in UTC to
  // local time zone hours, in 24 hour format (0-23)
  function localizeHour(index: number) {
    const hour = index + from;
    const utc = new Date();
    utc.setUTCHours(hour);
    return utc.getHours();
  }
</script>

<div class="picker">
  {#each Array(to + 1) as _, i}
    <PickerHour
      {row}
      hour={i + from}
      hourLocalized={localizeHour(i)}
      {del}
      {firstCorner}
      {secondCorner}
      {pAvailability}
      on:mousedown on:mouseenter on:mouseup />
  {/each}
</div>

<style lang="scss">
  .picker {
    display: flex;
    flex: 1 1;

    :global(button.userSelected + button.userSelected::before) {
      left: -80%;
      margin: auto 0;
      width: 160%;
      z-index: 1;
    }
  }
</style>