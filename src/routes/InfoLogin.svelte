<script lang="ts">
  import { user, mura } from "../lib/mura";

  let username: string = "";
  function login(e: Event) {
    e.preventDefault();
    $user.name = username;

    const existing = $mura.participants.find((p) => p.name === $user.name);
    if (existing) {
      $user.availability = existing.availability;
      return;
    }
    
    const from = new Date($mura.date_from).getDate();
    const to = new Date($mura.date_to).getDate() - from;

    for (let i = 0; i < to + 1; i++) {
      const date = new Date($mura.date_from);
      date.setDate(date.getDate() + i);
      $user.availability.push({
        date: date.toISOString(),
        times: []
      });
    }
  }
</script>

<section class="login">
  <h3>Add Availability</h3>
  {#if $user.name}
    <p>Hi {$user.name}! Click or drag times on the left to select your availability. Click again to remove your availability.</p>
  {:else}
  <form>
    <label for="name">
      <span>Your Name</span>
      <input id="name" type="text" placeholder="Public Nickname" bind:value={username}>
    </label>
    <button on:click={login}>Continue</button>
  </form>
  {/if}
</section>

<style lang="scss">
  .login {
    > form {
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

    p {
      font-size: 0.8rem;
      margin: 0;
    }
  }
</style>