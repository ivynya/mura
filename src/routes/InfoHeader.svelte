<script lang="ts">
  import { mura } from "../lib/mura";
</script>

<div class="info">
  <img src="./plant.png" alt="Plant Icon">
  <p class="tag"><code>Currently Scheduling</code></p>
  <h2>{$mura.meeting_name}</h2>
  <p>{$mura.meeting_desc}</p>
  <p>
    Hosted by <b>{$mura.meeting_host}</b>
     • {$mura.meeting_length} Hour{#if $mura.meeting_length > 1}s{/if} Long</p>
  <hr>
</div>

<style lang="scss">
  img {
    max-width: 100px;
    max-height: 100px;

    @media (max-height: 768px) {
      display: none;
    }
  }

  .info {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 0.25rem;

    h2 {
      font-size: 2rem;
      margin-top: 0.5rem;
      margin-bottom: 0;
    }

    hr {
      border: 0;
      border-top: 1px solid #011627;
      max-width: 100px;
      margin-top: 1rem;
      flex: 1 1;
      width: 100%;
    }

    p {
      margin: 0;
    }
  }
</style>