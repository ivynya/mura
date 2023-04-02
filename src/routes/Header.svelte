
<script lang="ts">
	import { mura } from "../lib/mura";

  function share() {
    if (navigator.share) {
      navigator
        .share({
          title: "Schedule with Ivy on Mura",
          text: `Schedule for ${$mura.meeting_name} with ${$mura.meeting_host}`,
          url: `https://mura.ivy.direct/${$mura.meeting_id}`,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    }
  }
</script>

<header>
  <h1>
    <img src="/favicon.png" alt="Mura Icon">
    <span>MURA</span>
  </h1>
  {#if $mura.meeting_id && $mura.meeting_id != 'XYZI'}
  <code class="share">mura.ivy.direct/{$mura.meeting_id}</code>
  {/if}
  <div>
    <a href="/create">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
      </svg>
    </a>
    {#if $mura.meeting_id  && $mura.meeting_id != 'XYZI'}
    <button class="share" on:click={share}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-up" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M3.5 6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8A1.5 1.5 0 0 1 3.5 5h2a.5.5 0 0 1 0 1h-2z"/>
        <path fill-rule="evenodd" d="M7.646.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 1.707V10.5a.5.5 0 0 1-1 0V1.707L5.354 3.854a.5.5 0 1 1-.708-.708l3-3z"/>
      </svg>
    </button>
    {/if}
  </div>
</header>

<style lang="scss">
	header {
    display: flex;
    align-items: center;
    justify-content: space-between;
		padding: 0.5rem 2rem;
    padding-top: 0.35rem;

    img {
      height: 50px;
      width: 50px;
      margin-right: 10px;
    }

		h1 {
      display: flex;
      align-items: center;
			font-size: 1.5em;
			margin: 0;
		}

    div {
      display: flex;
      align-items: center;
      column-gap: 1rem;
    }

    button, a {
      background: none;
      border: none;
      border-radius: 0.5rem;
      color: #f5fff1;
      display: grid;
      place-items: center;

      font-family: inherit;
      cursor: pointer;
      width: 2.5rem;
      height: 2.5rem;

      svg {
        height: 1.5rem;
        width: 1.5rem;
      }

      &:hover {
        color: #2EC4B6;
      }
    }

    @media (max-width: 768px) {
      padding: 0.5rem 1rem;

      .share {
        display: none;
      }
    }
	}
</style>