<script lang="ts">
	import Header from "./Header.svelte";
	import Picker from "./Picker.svelte";
  import { mura } from "../lib/mura";
</script>

<div class="app">
  <Header />
	<main>
    <Picker bind:mura={$mura} />
		<div class="info-bar">
      <div>
        <p class="tag"><code>Currently Scheduling #{$mura.meeting_id}</code></p>
        <h2>{$mura.meeting_name}</h2>
        <p>{$mura.meeting_desc}</p>
        <p>Hosted by <b>{$mura.meeting_host}</b> • {$mura.meeting_length} Hour Long</p>
        <hr>
      </div>
      <div class="suggested-time">
        <h3>Mura Suggested Time</h3>
        <p class="tag"><b>May 5th at 3:00 PT</b></p>
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
        
        margin: 0.75rem 0;
        margin-top: 0;
        padding: 0.25rem 0.75rem;
        text-transform: uppercase;
      }

      h2 {
        font-size: 2rem;
        margin: 0;
      }

      hr {
        border: 0;
        border-top: 1px solid #011627;
        max-width: 150px;
        margin-top: 2rem;
      }

      .suggested-time {
        border: 1px solid #011627;
        border-radius: 0.5rem;
        padding: 1.5rem 2rem;

        h3 {
          background-color: #f5fff1;
          margin-top: -2.5rem;
        }

        p {
          margin-bottom: 0;
        }
      }
		}
	}
</style>
