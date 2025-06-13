<script lang="ts">
	import { mura } from "../lib/mura";
	import PickerHour from "./PickerHour.svelte";
  

  interface Props {
    row: number;
    del: boolean;
    firstCorner: [number, number];
    secondCorner: [number, number];
  }

  let {
    row,
    del,
    firstCorner,
    secondCorner
  }: Props = $props();

  let from = $derived(new Date($mura.time_from).getUTCHours());
  let toHours = $derived(new Date($mura.time_to).getUTCHours());
  let to = $derived(toHours - from < 0 ? 24 + toHours - from : toHours - from);

  // Maps participants into anonymized availability 2D array
  // Formatted as flat number[] for availability on this day
  let pAvailability = $derived($mura.participants
    .map(p => p.availability[row])
    .map(d => d.times).flat());

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