
<div class="picker">
  {#each Array(12) as _, i}
    <button>{i + 1}<br>
      <span>
        {#if i < 11}
          AM
        {:else}
          PM
        {/if}
      </span>
    </button>
  {/each}
</div>

<style lang="scss">
  .picker {
    display: flex;
    flex: 1 1;

    > button {
      background: none;
      flex: 1 1;
      border: none;
      cursor: pointer;
      color: #f5fff1;

      font-family: inherit;
      font-size: 0.6rem;
      font-weight: bold;
      text-align: center;

      padding: 0 0.25rem;

      transition-duration: 0.1s;
      opacity: 0.5;
      position: relative;

      span {
        color: #2EC4B6;
        font-weight: normal;
      }
    }

    > button:hover {
      opacity: 1;
    }

    > button::after {
      background: none;
      content: "";
      cursor: pointer;
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      transition-duration: 0.25s;
    }

    > button:hover::after {
      background: #2EC4B655;
    }
  }
</style>