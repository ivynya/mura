<script lang="ts">
	import type { Mura } from "../lib/mura";

  export let mura: Mura;
  export let date: string;

  $: from = new Date(mura.time_from).getUTCHours();
  $: to = new Date(mura.time_to).getUTCHours() - from;

  // Generate a normalized value from 0 to 5 for availability
  // based on participant availability and total participants
  $: participantCount = mura.participants.length;
  function calculateHeatmapNormal(hour: number) {
    const availability = mura.participants.map(p => p.availability);
    const available = availability
      .filter(a => a.some(d => d.date === date && d.times.some(t => t === hour)))
    return ((available.length / participantCount) * 5).toFixed(0);
  }

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
    <button class="heatmap-{calculateHeatmapNormal(i + from)}">
      {localizeHour(i) % 12 + 1}<br>
      <span>{#if localizeHour(i) < 11}AM{:else}PM{/if}</span>
    </button>
  {/each}
</div>

<style lang="scss">
  .picker {
    display: flex;
    flex: 1 1;

    > button {
      background: none;
      flex: 1 1;
      border: none;
      cursor: pointer;
      color: #f5fff1;

      font-family: inherit;
      font-size: 0.6rem;
      font-weight: bold;
      text-align: center;

      padding: 0 0.25rem;

      transition-duration: 0.1s;
      position: relative;

      span {
        color: #f5fff1;
        font-weight: normal;
      }

      &.heatmap-0 span {
        color: #2EC4B6;
      }
      &.heatmap-1 {
        background-color: #2EC4B644;
      }
      &.heatmap-2 {
        background-color: #2EC4B666;
      }
      &.heatmap-3 {
        background-color: #2EC4B688;
      }
      &.heatmap-4 {
        background-color: #2EC4B6aa;
      }
      &.heatmap-5 {
        background-color: #2EC4B6cc;
      }
    }

    > button:hover {
      opacity: 1;
    }

    > button::after {
      background: none;
      content: "";
      cursor: pointer;
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      transition-duration: 0.25s;
    }

    > button:hover::after {
      background: #2EC4B655;
    }
  }
</style>