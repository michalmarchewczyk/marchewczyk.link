<script>
    import {fade} from 'svelte/transition';

    let url = '';
    let customSlug = false;
    let slug = '';
    let editable = false;

    let message = {type: null, msg: null};
    let msgTimeout;

    const send = async (e) => {
        e.preventDefault();
        const data = {
            url,
            slug: customSlug ? slug : '',
            editable,
        };
        const response = await fetch('/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if(response.status === 429){
            message = {type: 'error', msg: 'Request limit exceeded, try again in 10 minutes'};
        }else{
            const resData = await response.json();
            if (resData.messages) {
                message = {type: 'error', msg: resData.messages.join('; ')};
            } else {
                message = {type: 'success', msg: resData.slug};
            }
            if (resData.editToken) {
                message = {...message, editToken: resData.editToken};
            }
        }
        window.clearTimeout(msgTimeout);
        msgTimeout = setTimeout(() => {
            message = {type: null, msg: 'null'};
        }, 10000);
    };
</script>


<form on:submit={send}>
    <div class='text'>
        <input id='url' type='text' bind:value={url} required placeholder=' ' autocomplete='off'/>
        <label for='url'>URL</label>
    </div>

    <div class='checkbox'>
        <input id='custom-slug' type='checkbox' bind:checked={customSlug}/>
        <label for='custom-slug'>Custom slug</label>
    </div>

    <div class='checkbox'>
        <input id='editable' type='checkbox' bind:checked={editable}/>
        <label for='editable'>Editable</label>
    </div>

    {#if customSlug}
        <div class='text'>
            <input id='slug' type='text' bind:value={slug} required placeholder=' ' autocomplete='off'/>
            <label for='slug'>Slug</label>
        </div>
    {/if}

    <button on:click={send}>
        <span>Create</span>
        <svg width='32' height='24' id='form_send_arrow_right' viewBox='0 0 32 24' fill='none'
             xmlns='http://www.w3.org/2000/svg'>
            <line x1='-3.27835e-08' y1='12.25' x2='30' y2='12.25' stroke='white' stroke-width='1.5'/>
            <line x1='19.5303' y1='1.46967' x2='30.5303' y2='12.4697' stroke='white' stroke-width='1.5'/>
            <line y1='-0.75' x2='15.5563' y2='-0.75' transform='matrix(0.707107 -0.707107 -0.707107 -0.707107 19 22.5)'
                  stroke='white' stroke-width='1.5'/>
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
            <span>Link: <a href={`http://${window.location.host}/${message.msg}`}>{window.location.host}/{message.msg}</a></span>
            {#if message.editToken}<span>Edit token: {message.editToken}</span>{/if}
        {/if}
    </div>
{/if}


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
      clear: both;

      label {
        display: inline-block;
        position: absolute;
        background: black;
        //top: 0;
        margin-top: -3.4em;
        margin-left: 0.4em;
        padding: 0.1em 0.4em 0.1em 0.4em;
        font-size: 1em;
        font-family: Quicksand, sans-serif;
        font-weight: 300;
        pointer-events: none;
        transition: all 0.08s linear;
        color: rgba(255, 255, 255, 0.6);
        user-select: none;
      }

      input:placeholder-shown:not(:focus) + label {
        margin-top: -1.9em;
        font-size: 1.1em;
        margin-left: 0.1em;
      }

      input {
        margin-top: -0.5em;
        width: 100%;
        background: rgba(0, 0, 0, 0.5);
        border: 2px solid rgba(255, 255, 255, 0.4);
        font-size: 1.1em;
        color: white;
        outline: none;
        padding: 0.5em 0 0.5em 0;
        text-indent: 0.4em;
        font-family: Quicksand, sans-serif;
        font-weight: 300;
        transition: border 0.08s linear;
        box-shadow: none;
      }

      input:focus {
        border: 2px solid rgba(255, 255, 255, 1);
      }

      input:focus + label {
        color: rgba(255, 255, 255, 1);
      }
    }

    div.checkbox {
      display: block;
      position: relative;
      left: 0;
      top: 0;
      width: auto;
      height: 100%;
      margin: 1em 2em 2em 0;
      float: left;

      input {
        display: none;
      }

      label {
        padding-left: 1.2em;
        line-height: 1.5em;
        user-select: none;
        font-size: 1em;
        font-family: Quicksand, sans-serif;
        font-weight: 300;
        cursor: pointer;
        color: white;

        &::before {
          content: "";
          display: block;
          position: absolute;
          width: 1.4em;
          height: 1.4em;
          border: 2px solid white;
          float: left;
          top: 0;
        }

        &::after {
          content: "";
          display: block;
          position: relative;
          width: 0.9em;
          height: 0.9em;
          top: 0.336em;
          left: 0.336em;
          float: left;
        }
      }

      input:checked + label {
        &::after {
          background: white;
        }
      }
    }

    button {
      display: block;
      background: rgba(0, 0, 0, 0.6);
      height: 2.2em;
      color: white;
      border: 2px solid white;
      outline: none;
      font-family: Quicksand, sans-serif;
      font-size: 1.1em;
      font-weight: 300;
      margin-left: auto;
      margin-right: auto;
      margin-top: 1.6em;
      cursor: pointer;
      overflow: hidden;
      opacity: 0.8;
      user-select: none;
      clear: both;

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
    border: 2px solid white;
    color: white;

    span {
      font-size: 1.2em;
      font-weight: 300;
      display: block;
      margin-bottom: 0.2em;

      &:first-child {
        display: block;
        font-weight: 500;
      }

      a {
        color: white;
        font-weight: 500;
      }
    }

  }
</style>
