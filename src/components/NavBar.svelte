<script>
    export let views = [];

    export let view;

</script>

<style lang='scss'>
  nav {
    button {
      &.selected {
        font-weight: bold;
      }
    }
  }
</style>

<nav>
    {#each views as v}
        <button on:click={() => view = v.name} class:selected={view === v.name}>
            {v.text}
        </button>
    {/each}
</nav>
