<script>
    let slug = '';
    import {fade} from 'svelte/transition';

    let message = {type: null, msg: null};
    let msgTimeout;

    const send = async (e) => {
        e.preventDefault();

        const response = await fetch(`/api/${slug}`, {
            method: 'GET',
        });
        if(response.status !== 200){
            message = {type: 'error', msg: 'Not found'}
        }else{
            const resData = await response.json();
            message = {type: 'success', msg: resData.url}
            console.log(resData);
        }
        window.clearTimeout(msgTimeout);
        msgTimeout = setTimeout(() => {
            message = {type: null, msg: 'null'}
        }, 10000);

    }
</script>

<style>

</style>

<form on:submit={send}>

    <label for='slug'>Slug:</label>
    <input id='slug' type='text' bind:value={slug}/>

    <input type='submit' value='Search'/>
</form>
{#if message.type}
    <div class='msg' transition:fade={{duration: 100}} class:msgError={message.type==='error'}>
        {#if message.type === 'error'}
            <span>Error: {message.msg}</span>
        {:else if message.type === 'success'}
            <span>Found: <a href={message.msg}>{message.msg}</a></span>
        {/if}
    </div>
{/if}
