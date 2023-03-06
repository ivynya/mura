<script>
	import Header from "./Header.svelte";
	import TimePicker from "./TimePicker.svelte";
</script>

<div class="app">
  <Header />
	<main>
		<div class="picker">
      {#each Array(10) as _, i}
        <div class="day">
          <div class="day-number">
            <span>{i + 1}</span>
            <span>MON</span>
          </div>
          <TimePicker />
        </div>
      {/each}
    </div>
		<div class="info-bar">
      <div>
        <p class="tag"><code>Currently Scheduling</code></p>
        <h2>Meeting Name Here</h2>
        <p>Hosted by <b>Ivy</b> • 1 Hour Long</p>
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

        > div {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding-left: 2rem;
          padding-right: 1rem;
          width: 2rem;

          font-size: 2rem;

          :last-child {
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
