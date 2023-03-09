<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { type Mura, user } from "../lib/mura";

  export let mura: Mura;

  export let date: string;
  export let hour: number;
  export let hourLocalized: number;
  export let row: number;

  export let del: boolean;
  export let firstCorner: [number, number];
  export let secondCorner: [number, number];
  $: highlight = (del === userSelected)
    && row >= firstCorner[0]
    && row <= secondCorner[0]
    && hour >= firstCorner[1]
    && hour <= secondCorner[1];

  const dispatch = createEventDispatcher();
  const mouseDown = () => dispatch("mousedown", { row, hour, del: userSelected });
  const mouseEnter = () => dispatch("mouseenter", { row, hour });
  const mouseUp = () => dispatch("mouseup");

  $: userAvailability = $user.availability.filter(d => d.date === date);
  $: userTimes = userAvailability.map(d => d.times).flat();
  $: userSelected = userTimes.some(t => t === hour);

  // Generate a normalized value from 0 to 5 for availability
  // based on participant availability and total participants
  $: participantCount = mura.participants.length;
  function calculateHeatmapNormal(hour: number) {
    const availability = mura.participants.map(p => p.availability);
    const available = availability
      .filter(a => a.some(d => d.date === date && d.times.some(t => t === hour)))

    return ((available.length / participantCount) * 5).toFixed(0);
  }
</script>

<button
  on:mousedown={mouseDown}
  on:mouseenter={mouseEnter}
  on:mouseup={mouseUp}
  class="heatmap-{calculateHeatmapNormal(hour)}"
  class:highlight
  class:userSelected>
  {hourLocalized % 12 + 1}<br>
  <span>{#if hourLocalized < 11}AM{:else}PM{/if}</span>
</button>

<style lang="scss">
  button {
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

  button:hover {
    opacity: 1;
  }

  button::after, button::before {
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
    z-index: 5;
  }

  button::before {
    background-color: #b5d841;
    border-radius: 50%;
    top: 65%;
    margin: auto;
    height: 15px;
    width: 15px;
    opacity: 0;
  }

  button:hover::after, button.highlight::after {
    background: #b5d84177;
  }

  button.userSelected:hover::after, button.userSelected.highlight::after {
    background: #D1495Baa;
  }

  button.userSelected::before {
    opacity: 1;
  }
</style>