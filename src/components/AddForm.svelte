<script>
    let url = '';
    let customSlug = false;
    let slug = '';
    import {fade} from 'svelte/transition';

    let message = {type: null, msg: null};
    let msgTimeout;

    const send = async (e) => {
        e.preventDefault();
        const data = {
            url,
            slug: customSlug ? slug : '',
        }
        const response = await fetch('/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const resData = await response.json();
        if(resData.messages){
            message = {type: 'error', msg: resData.messages.join('; ')}
        }else{
            message = {type: 'success', msg: resData.slug}
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
    <label for='url'>URL:</label>
    <input id='url' type='text' bind:value={url}/>

    <label for='custom-slug'>Custom slug:</label>
    <input id='custom-slug' type='checkbox' bind:checked={customSlug}/>

    {#if customSlug}
        <label for='slug'></label>
        <input id='slug' type='text' bind:value={slug}/>
    {/if}

    <input type='submit' value='Create'/>
</form>
{#if message.type}
    <div class='msg' transition:fade={{duration: 100}} class:msgError={message.type==='error'}>
        {#if message.type === 'error'}
            <span>Error: {message.msg}</span>
        {:else if message.type === 'success'}
            <span>Success: <a href={`http://${window.location.host}/${message.msg}`}>{window.location.host}/{message.msg}</a></span>
        {/if}
    </div>
{/if}
