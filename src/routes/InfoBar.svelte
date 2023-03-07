<script lang="ts">
	import InfoHeader from "./InfoHeader.svelte";
	import InfoNav from "./InfoNav.svelte";
  import type { Mura } from "../lib/mura";

  export let mura: Mura;
  let activePage: "meeting" | "participants" | "help" = "meeting";
</script>

<div class="info-bar">
  <InfoHeader {mura} />
  <br>
  {#if activePage === "meeting"}
  <div class="login">
    <h3>Add Availability</h3>
    <div>
      <label for="name">
        <span>Your Name</span>
        <input id="name" type="text" placeholder="Public Nickname">
      </label>
      <button>Continue</button>
    </div>
  </div>
  <span class="spacer"></span>
  <div class="suggested-time">
    <h3>Mura Suggested Time</h3>
    <p class="tag"><b>May 5th at 3:00 PT</b></p>
    <p>25 Participants • Includes You</p>
  </div>
  {/if}
  {#if activePage === "participants"}
  {/if}
  {#if activePage === "help"}
  {/if}
  <span class="spacer"></span>
  <InfoNav bind:activePage />
</div>

<style lang="scss">
  .info-bar {
    background: #f5fff1;
    border-top-left-radius: 1rem;
    box-sizing: border-box;
    color: #011627;
    display: flex;
    flex-direction: column;

    flex: 1 1;
    padding: 3rem;
    text-align: center;

    :global(.tag) {
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

    .login {
      > div {
        display: flex;
        align-items: flex-end;
        column-gap: 5px;
        width: 100%;
      }

      label {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        
        span {
          font-size: 0.8rem;
          margin-bottom: 0.25rem;
        }
      }

      input, button {
        background-color: transparent;
        border: 2px solid #011627;
        border-radius: 0.5rem;
        box-sizing: border-box;
        font-family: inherit;

        margin-bottom: 1rem;
        padding: 0.5rem 1rem;
      }

      input:focus {
        border-color: #2EC4B6;
        outline: none;
      }

      button:hover {
        cursor: pointer;
        background-color: #011627;
        color: #f5fff1;
        transition-duration: 0.2s;
      }
    }

    .suggested-time, .login {
      border: 1px solid #011627;
      border-radius: 0.5rem;
      margin: 0 auto;
      padding: 1.5rem 2rem;
      max-width: 320px;
      width: 100%;

      h3 {
        background-color: #f5fff1;
        margin: 1rem auto;
        margin-top: -2.5rem;
        width: fit-content;
        padding: 0 1rem;
      }

      p {
        margin-bottom: 0;
      }
    }

    .spacer {
      flex: 1 1;
    }
  }
</style>