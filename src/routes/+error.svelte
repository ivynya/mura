<script lang="ts">
	import { onMount } from "svelte";
</script>

<div>
  <img src="/plant.png" alt="Plant Icon">
  <h2>We can't find this Mura.</h2>
  <p>This could be for a few reasons:</p>
  <ul>
    <li>There's a typo in the meeting link.</li>
    <li>This meeting ID doesn't exist.</li>
    <li>This event is no longer scheduling.</li>
  </ul>
  <p><a href="/">Join a different Mura</a> or <a href="/create">create a new one</a>.</p>
</div>

<style lang="scss">
  div {
    background-color: #f5fff1;
    border-radius: 1rem;
    box-sizing: border-box;
    color: #011627;

    display: flex;
    flex-direction: column;
    gap: 1rem;

    max-width: 500px;
    margin: 1rem auto;
    margin-bottom: auto;
    padding: 1rem 2rem;
    padding-top: 1.5rem;
    width: 100%;

    img {
      height: 100px;
      width: 100px;
    }

    h2 {
      margin: 0;
    }

    a {
      color: #2EC4B6;
    }
  }
</style>