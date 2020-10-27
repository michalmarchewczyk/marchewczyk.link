<script>
	import AddForm from '../components/AddForm.svelte';
	import GetForm from '../components/GetForm.svelte';

	let view = 'add';

</script>

<style>

</style>

<svelte:head>
	<title>URL Shortener</title>
</svelte:head>

<nav>
	<button on:click={() => view = 'add'}>Create</button>
	<button on:click={() => view = 'get'}>Search</button>
</nav>

<div class='container'>
	{#if view==='add'}<AddForm/>{/if}
	{#if view==='get'}<GetForm/>{/if}
</div>
