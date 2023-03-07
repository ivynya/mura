<script lang="ts">
  import type { Mura } from "../lib/mura";

  export let mura: Mura;

  let highlighting = false;
</script>

<section class="participants">
  <h3>Participants</h3>
  <div>
    {#if highlighting}
    <div>
      <h4>Available</h4>
      <p>John</p>
      <p>Paul</p>
      <p>George</p>
      <p>Ringo</p>
    </div>
    <div>
      <h4>Unavailable</h4>
      <p>John</p>
      <p>Paul</p>
      <p>George</p>
      <p>Ringo</p>
    </div>
    {:else}
    {#each mura.participants as participant}
    <p class="participant">{participant.name}</p>
    {/each}
    {/if}
  </div>
</section>

<style lang="scss">
  .participants {
    > div {
      display: flex;
      flex: 1 1;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      column-gap: 1rem;
      row-gap: 0.25rem;

      > div {
        flex: 1 1;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        column-gap: 1rem;
        row-gap: 0.25rem;

        h4 {
          margin: 0;
        }

        p {
          font-size: 0.8rem;
          margin: 0;
        }
      }

      .participant {
        font-size: 0.8rem;
        margin: 0;
        min-width: 30%;
        flex: 1 1;
      }
    }
  }
</style>