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
            <span>Monday</span>
          </div>
          <TimePicker />
        </div>
      {/each}
    </div>
		<div class="info-bar">
      <h2>Meeting Name Here</h2>
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
      margin: 0 2rem;

      .day {
        display: flex;
        flex: 1 1;

        > div {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0 2rem;
        }
      }

      > :nth-child(odd) {
        background: #f5fff111;
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

      h2 {
        font-size: 2rem;
        margin: 0;
      }
		}
	}
</style>
