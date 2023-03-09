<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { type Mura, user } from "../lib/mura";

  const dispatch = createEventDispatcher();
  const mouseDown = (hour: number, del = false) => dispatch("mousedown", { row, hour, del });
  const mouseEnter = (hour: number) => dispatch("mouseenter", { row, hour });
  const mouseUp = (hour: number) => dispatch("mouseup", { row, hour });

  export let mura: Mura;
  export let date: string;
  export let row: number;

  export let del: boolean;
  export let firstCorner: [number, number];
  export let secondCorner: [number, number];

  $: from = new Date(mura.time_from).getUTCHours();
  $: to = new Date(mura.time_to).getUTCHours() - from < 0 ? 24 + new Date(mura.time_to).getUTCHours() - from : new Date(mura.time_to).getUTCHours() - from;

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

  // TODO: Move this into a service
  let refresh = 0;
  function toggleAvailability(hour: number) {
    const existing = $user.availability.find(d => d.date === date);

    if (existing) {
      const index = existing.times.indexOf(hour);
      if (index > -1) {
        existing.times.splice(index, 1);
      } else {
        existing.times.push(hour);
      }
    } else {
      $user.availability.push({
        date,
        times: [hour]
      });
    }
    refresh++;
  }
</script>

<div class="picker">
  {#each Array(to + 1) as _, i (refresh*24 + i)}
    <button on:click={() => toggleAvailability(i + from)}
      on:mousedown={() => mouseDown(i + from, $user.availability.some(d => d.date === date && d.times.some(t => t === i + from)))}
      on:mouseenter={() => mouseEnter(i + from)}
      on:mouseup={() => mouseUp(i + from)}
      class="heatmap-{calculateHeatmapNormal(i + from)}"
      class:highlight={(($user.availability.some(d => d.date === date && d.times.some(t => t === i + from)) && del) || (!$user.availability.some(d => d.date === date && d.times.some(t => t === i + from)) && !del)) && row >= firstCorner[0] && row <= secondCorner[0] && i + from >= firstCorner[1] && i + from <= secondCorner[1]}
      class:userSelected={$user.availability.some(d => d.date === date && d.times.some(t => t === i + from))}>
      {localizeHour(i) % 12 + 1}<br>
      <span>{#if localizeHour(i) < 11}AM{:else}PM{/if}</span><br>
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

    > button::after, > button::before {
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

    > button::before {
      background-color: #b5d841;
      border-radius: 50%;
      top: 65%;
      margin: auto;
      height: 15px;
      width: 15px;
      opacity: 0;
    }

    > button:hover::after, > button.highlight::after {
      background: #b5d84177;
    }

    > button.userSelected:hover::after, > button.userSelected.highlight::after {
      background: #D1495Baa;
    }

    > button.userSelected::before {
      opacity: 1;
    }

    > button.userSelected + button.userSelected::before {
      border-radius: 0.5rem;
      left: -2rem;
      margin: auto 0;
      width: 60px;
      z-index: 1;
    }
  }
</style>