<script lang="ts">
	import TimePicker from "./PickerDay.svelte";
	import { mura, user } from "../lib/mura";

  $: from = new Date($mura.date_from).getDate();
  $: to = new Date($mura.date_to).getDate() - from;

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

  let isDragging = false;
  let isDelete = false;
  let firstCorner: [number, number] = [-1, -1];
  let secondCorner: [number, number] = [-1, -1];
  let pinCorner: [number, number] = [-1, -1];
  function mouseDown(e: CustomEvent) {
    isDragging = true;
    isDelete = e.detail.del;
    firstCorner = pinCorner = [e.detail.row, e.detail.hour];
  }

  function mouseEnter(e: CustomEvent) {
    if (isDragging) {
      // Quarter 4
      if (e.detail.row <= pinCorner[0] && e.detail.hour <= pinCorner[1]) {
        firstCorner = [e.detail.row, e.detail.hour];
        secondCorner = pinCorner;
      }
      // Quarter 2
      else if (e.detail.row >= pinCorner[0] && e.detail.hour >= pinCorner[1]) {
        firstCorner = pinCorner;
        secondCorner = [e.detail.row, e.detail.hour];
      }
      // Quarter 3
      else if (e.detail.row > pinCorner[0] && e.detail.hour < pinCorner[1]) {
        firstCorner = [pinCorner[0], e.detail.hour];
        secondCorner = [e.detail.row, pinCorner[1]];
      }
      // Quarter 1
      else if (e.detail.row <= pinCorner[0] && e.detail.hour >= pinCorner[1]) {
        firstCorner = [e.detail.row, pinCorner[1]];
        secondCorner = [pinCorner[0], e.detail.hour];
      }
    }
  }

  function mouseUp() {
    for (let i = firstCorner[0]; i <= secondCorner[0]; i++) {
      for (let j = firstCorner[1]; j <= secondCorner[1]; j++) {
        // TODO: adjust availability
      }
    }

    isDragging = false;
    firstCorner = [-1, -1];
    secondCorner = [-1, -1];
    pinCorner = [-1, -1];
  }
</script>

<div class="picker" class:authed={$user.name}>
  {#each Array(to + 1) as _, i}
    <div class="day">
      <div class="day-number">
        <span>{i + 1 + from}</span>
        <span>{getDateFromDay(new Date(), i)}</span>
      </div>
      <TimePicker
        row={i}
        del={isDelete}
        firstCorner={firstCorner}
        secondCorner={secondCorner}
        on:mousedown={mouseDown} 
        on:mouseup={mouseUp}
        on:mouseenter={mouseEnter} />
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