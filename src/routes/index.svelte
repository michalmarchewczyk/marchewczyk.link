<script>
    import AddForm from '../components/AddForm.svelte';
    import GetForm from '../components/GetForm.svelte';
    import NavBar from '../components/NavBar.svelte';
    import EditForm from '../components/EditForm.svelte';


    let view = 'add';
</script>



<svelte:head>
    <title>URL Shortener</title>
</svelte:head>

<NavBar views={[
		{name: 'add', text: 'Create'},
		{name: 'get', text: 'Search'},
		{name: 'edit', text: 'Edit'},
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
    {#if view === 'edit'}
        <h2>Edit URL</h2>
        <EditForm/>
    {/if}
</div>



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
