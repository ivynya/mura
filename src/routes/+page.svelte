<script lang="ts">
	import Header from "./Header.svelte";
	import TimePicker from "./TimePicker.svelte";
  import { mura } from "$lib/mura";

  $: from = new Date($mura.date_from);
  $: to = new Date($mura.date_to).getDate() - from.getDate();

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

<div class="app">
  <Header />
	<main>
		<div class="picker">
      {#each Array(to + 1) as _, i}
        <div class="day">
          <div class="day-number">
            <span>{i + 1 + from.getDate()}</span>
            <span>{getDateFromDay(new Date(), i)}</span>
          </div>
          <TimePicker />
        </div>
      {/each}
    </div>
		<div class="info-bar">
      <div>
        <p class="tag"><code>Currently Scheduling</code></p>
        <h2>{$mura.meeting_name}</h2>
        <p>Hosted by <b>{$mura.meeting_host}</b> • {$mura.meeting_length} Hour Long</p>
      </div>
      <div>
        <h3>Suggested Meeting Time</h3>
        <p><b>May 5th at 3:00 PT</b></p>
        <p>25 People • Includes You</p>
      </div>
    </div>
	</main>
</div>

<style lang="scss">
	.app {
		display: flex;
		flex-direction: column;
		height: 100vh;
	}

	main {
		display: flex;
		flex: 1 1;

		.picker {
			background: #011627;
      border-top-left-radius: 1rem;
      border-top-right-radius: 1rem;
      box-sizing: border-box;
      overflow: hidden;

      display: flex;
      flex-direction: column;
			flex: 1 1;
      margin-left: 2.5rem;
      margin-right: 1.5rem;

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

		.info-bar {
			background: #f5fff1;
      border-top-left-radius: 1rem;
      box-sizing: border-box;
      color: #011627;
      display: grid;
      place-items: center;

			flex: 1 1;
      padding: 1rem;
      text-align: center;

      .tag {
        background: #011627;
        border-radius: 0.5rem;
        color: #2EC4B6;
        display: inline-block;
        font-size: 0.75rem;
        font-weight: bold;
        padding: 0.25rem 0.5rem;
        text-transform: uppercase;
      }

      h2 {
        font-size: 2rem;
        margin: 0;
      }
		}
	}
</style>
