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

    label {
      display: flex;
      flex-direction: column;
      font-size: 0.75rem;
      font-weight: bold;
      text-transform: uppercase;
    }

    input, select {
      appearance: none;
      background-color: transparent;
      border: 1px solid #011627;
      border-radius: 0.25rem;
      box-sizing: border-box;
      font-family: inherit;
      font-size: 0.8rem;
      margin-top: 0.15rem;
      padding: 0.15rem 0.5rem;
    }

    input:focus {
      border: 1px solid #2EC4B6;
      outline: none;
    }

    input[readonly] {
      color: #01162755;
      cursor: not-allowed;
    }

    button {
      background-color: #011627;
      border: none;
      border-radius: 0.25rem;
      color: #f5fff1;
      cursor: pointer;
      font-family: inherit;
      font-size: 0.8rem;
      font-weight: bold;
      margin-top: 1rem;
      padding: 0.5rem 1rem;
      text-transform: uppercase;
    }

    .regen {
      font-size: 0.5rem;
      margin-top: 0.25rem;
      padding: 0.05rem 0.5rem;
      width: fit-content;
    }
  }
</style>