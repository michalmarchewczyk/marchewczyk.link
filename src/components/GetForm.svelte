<script>
    import {fade} from 'svelte/transition';
    let slug = '';

    let message = {type: null, msg: null};
    let msgTimeout;

    const send = async (e) => {
        e.preventDefault();

        const response = await fetch(`/api/${slug}`, {
            method: 'GET',
        });
        if (response.status !== 200) {
            message = {type: 'error', msg: 'Not found'};
        } else {
            const resData = await response.json();
            message = {type: 'success', msg: resData.url};
        }
        window.clearTimeout(msgTimeout);
        msgTimeout = setTimeout(() => {
            message = {type: null, msg: 'null'};
        }, 10000);

    };
</script>

<style lang='scss'>
  form {
    display: block;
    position: relative;
    margin: 2em auto;
    width: 28em;
    max-width: calc(100vw - 4em);

    div.text {
      display: block;
      position: relative;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      margin-top: 1.8em;

      label {
        display: inline-block;
        position: absolute;
        background: white;
        top: 0;
        margin-top: -1.4em;
        margin-left: 0.4em;
        padding: 0.1em 0.4em 0.1em 0.4em;
        font-size: 1em;
        font-family: Quicksand, sans-serif;
        font-weight: 500;
        pointer-events: none;
        transition: all 0.08s linear;
        color: rgba(0, 0, 0, 0.6);
        user-select: none;
      }

      input:placeholder-shown:not(:focus) + label {
        margin-top: 0;
        font-size: 1.1em;
        margin-left: 0.1em;
      }

      input {
        margin-top: -0.5em;
        width: 100%;
        background: rgba(255, 255, 255, 0.5);
        border: 2px solid rgba(0, 0, 0, 0.4);
        font-size: 1.1em;
        color: black;
        outline: none;
        padding: 0.5em 0 0.5em 0;
        text-indent: 0.4em;
        font-family: Quicksand, sans-serif;
        font-weight: 500;
        transition: border 0.08s linear;
        box-shadow: none;
      }

      input:focus {
        border: 2px solid rgba(0, 0, 0, 1);
      }

      input:focus + label {
        color: rgba(0, 0, 0, 1);
      }
    }

    button {
      display: block;
      background: rgba(255, 255, 255, 0.6);
      height: 2.2em;
      color: black;
      border: 2px solid black;
      outline: none;
      font-family: Quicksand, sans-serif;
      font-size: 1.1em;
      font-weight: 500;
      margin-left: auto;
      margin-right: auto;
      margin-top: 1.6em;
      cursor: pointer;
      overflow: hidden;
      opacity: 0.8;
      user-select: none;

      &:hover {
        opacity: 1;
      }

      &:hover #form_send_arrow_right {
        animation: arrow_right 0.4s linear;
      }

      svg {
        display: block;
        position: relative;
        float: left;
        top: 0;
        left: 0;

        &#form_send_arrow_right {
          margin-top: 0.15em;
          margin-left: 0.2em;
          margin-right: 0.4em;
        }
      }

      span {
        float: left;
        margin-top: 0;
        margin-left: 0.4em;
        margin-right: 0.4em;
      }
    }
  }

  @keyframes arrow_right {
    0% {
      left: 0;
    }
    30% {
      left: 0.4em;
    }
    70% {
      left: -0.1em;
    }
    100% {
      left: 0;
    }
  }


  .msg {
    display: block;
    position: relative;
    width: 26.4em;
    margin: 3em auto;
    font-family: Quicksand, sans-serif;
    padding: 0.8em;
    border: 2px solid black;

    span {
      font-size: 1.2em;
      font-weight: 500;

      &:first-child {
        display: block;
        font-weight: 700;
        float: none;
        margin-bottom: 0.2em;
      }

      a {
        color: black;
        font-weight: 600;
      }
    }

  }
</style>

<form on:submit={send}>
    <div class='text'>
        <input id='slug' type='text' bind:value={slug} required placeholder=' ' autocomplete='off'/>
        <label for='slug'>Slug</label>
    </div>

    <button on:click={send}>
        <span>Search</span>
        <svg width='32' height='24' id='form_send_arrow_right' viewBox='0 0 32 24' fill='none'
             xmlns='http://www.w3.org/2000/svg'>
            <line x1='-3.27835e-08' y1='12.25' x2='30' y2='12.25' stroke='black' stroke-width='1.5'/>
            <line x1='19.5303' y1='1.46967' x2='30.5303' y2='12.4697' stroke='black' stroke-width='1.5'/>
            <line y1='-0.75' x2='15.5563' y2='-0.75' transform='matrix(0.707107 -0.707107 -0.707107 -0.707107 19 22.5)'
                  stroke='black' stroke-width='1.5'/>
        </svg>
    </button>

</form>
{#if message.type}
    <div class='msg' transition:fade={{duration: 100}} class:msgError={message.type==='error'}>
        {#if message.type === 'error'}
            <span>Error</span>
            <span>{message.msg}</span>
        {:else if message.type === 'success'}
            <span>Success</span>
            <span>Found: <a href={message.msg}>{message.msg}</a></span>
        {/if}
    </div>
{/if}
