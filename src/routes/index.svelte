<script>
    import AddForm from '../components/AddForm.svelte';
    import GetForm from '../components/GetForm.svelte';
    import NavBar from '../components/NavBar.svelte';


    let view = 'add';
</script>

<style lang='scss'>
  .container {
    display: block;
    position: absolute;
    top: 3em;
    padding: 1em;
    width: calc(100vw - 2em);

    h2 {
      text-align: center;
      font-family: Quicksand, sans-serif;
      font-weight: 400;
      font-size: 2em;
    }
  }
</style>

<svelte:head>
    <title>URL Shortener</title>
</svelte:head>

<NavBar views={[
		{name: 'add', text: 'Create'},
		{name: 'get', text: 'Search'},
		]}
        bind:view={view}/>

<div class='container'>
    {#if view === 'add'}
        <h2>Shorten URL</h2>
        <AddForm/>
    {/if}
    {#if view === 'get'}
        <h2>Preview URL</h2>
        <GetForm/>
    {/if}
</div>
