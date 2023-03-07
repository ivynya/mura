<script lang="ts">
	import TimePicker from "./TimePicker.svelte";
	import { type Mura, user } from "../lib/mura";
  
  export let mura: Mura;

  $: from = new Date(mura.date_from).getDate();
  $: to = new Date(mura.date_to).getDate() - from;

  function getDateOffset(date: Date, offset: number) {
    date.setDate(date.getDate() + offset);
    return date;
  }

  function getDateFromDay(from: Date, day: number) {
    from.setDate(from.getDate() + day);
    switch (from.getUTCDay()) {
      case 0:
        return "Sun";
      case 1:
        return "Mon";
      case 2:
        return "Tue";
      case 3:
        return "Wed";
      case 4:
        return "Thu";
      case 5:
        return "Fri";
      case 6:
        return "Sat";
    }
  }
</script>

<div class="picker" class:authed={$user.name}>
  {#each Array(to + 1) as _, i}
    <div class="day">
      <div class="day-number">
        <span>{i + 1 + from}</span>
        <span>{getDateFromDay(new Date(), i)}</span>
      </div>
      <TimePicker bind:mura={mura} date={getDateOffset(new Date(mura.date_from), i).toISOString()} />
    </div>
  {/each}
</div>

<style lang="scss">
  .picker {
    background: #011627;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    box-sizing: border-box;
    overflow: hidden;

    display: flex;
    flex-direction: column;
    flex: 1.25 1;
    margin-left: 2.5rem;
    margin-right: 1.5rem;

    pointer-events: none;
    &.authed {
      pointer-events: all;
    }

    .day {
      display: flex;
      flex: 1 1;
      text-transform: uppercase;

      > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding-left: 2.5rem;
        padding-right: 2rem;
        width: 2rem;

        font-size: 2rem;

        :not(:first-child) {
          font-size: 0.75rem;
        }
      }
    }

    > :nth-child(odd) {
      background: #f5fff10a;
    }
  }
</style>