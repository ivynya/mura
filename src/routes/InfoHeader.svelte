<script lang="ts">
  import type { Mura } from "../lib/mura";

  export let mura: Mura;
</script>

<div class="info">
  <canvas id="canvas3d"></canvas>
  <script type="module">
    import { Application } from './runtime.js';
    const canvas = document.getElementById('canvas3d');
    const app = new Application(canvas);
    app.load('./scene.splinecode');
  </script>
  <p class="tag"><code>Currently Scheduling</code></p>
  <h2>{mura.meeting_name}</h2>
  <p>{mura.meeting_desc}</p>
  <p>Hosted by <b>{mura.meeting_host}</b> • {mura.meeting_length} Hour Long</p>
  <hr>
</div>

<style lang="scss">
  #canvas3d {
    max-width: 250px;
    max-height: 250px;
    margin: -2.5rem;

    @media (max-height: 992px) {
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