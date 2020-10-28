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
        <AddForm/>
    {/if}
    {#if view === 'get'}
        <GetForm/>
    {/if}
</div>
