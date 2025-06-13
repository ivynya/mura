<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { mura, user } from "../lib/mura";



  const dispatch = createEventDispatcher();
  const mouseDown = () => dispatch("mousedown", { row, hour, del: userSelected });
  const mouseEnter = () => dispatch("mouseenter", { row, hour });
  const mouseUp = () => dispatch("mouseup");


  // Generate a normalized value from 0 to 5 for availability
  
  interface Props {
    hour: number;
    hourLocalized: number;
    row: number;
    del: boolean;
    firstCorner: [number, number];
    secondCorner: [number, number];
    // based on participant availability and total participants
    pAvailability: number[];
  }

  let {
    hour,
    hourLocalized,
    row,
    del,
    firstCorner,
    secondCorner,
    pAvailability
  }: Props = $props();
  // Determines if the user has selected this hour as available
  let userSelected = $derived($user.availability[row]?.times.some(t => t === hour));
  let highlight = $derived((del === userSelected)
    && row >= firstCorner[0]
    && row <= secondCorner[0]
    && hour >= firstCorner[1]
    && hour <= secondCorner[1]);
  let heatmapNormal = $derived((((pAvailability.filter(t => t === hour).length / $mura.participants.length) * 5) || 0).toFixed(0));
</script>

<button
  onmousedown={mouseDown}
  onmouseenter={mouseEnter}
  onmouseup={mouseUp}
  class="heatmap-{heatmapNormal}"
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
    border-radius: 0.5rem;
    top: 65%;
    margin: auto;
    height: 15px;
    width: 20%;
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