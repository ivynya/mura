
<div class="picker">
  {#each Array(10) as _, i}
    <button></button>
  {/each}
</div>

<style lang="scss">
  .picker {
    display: flex;
    flex: 1 1;

    > button {
      flex: 1 1;
      background: #2EC4B655;
      border: none;
      cursor: pointer;
      color: #f5fff1;
      font-size: 1.5rem;
      font-weight: bold;
      text-align: center;
    }
  }
</style>