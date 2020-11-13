<script>
    import logo from '../static/images/logotype-link.svg';


    export let views = [];

    export let view;

</script>

<style lang='scss'>
  nav {
    display: block;
    position: absolute;
    box-shadow: 0 -22px 16px 20px rgba(0,0,0,0.4);
    width: 100vw;
    height: 3em;

    .nav_logo {
      display: inline-block;
      position: relative;
      height: 3em;
      width: 13em;
      margin-left: 0;
      text-decoration: none;
      user-select: none;

      img {
        position: absolute;
        height: 2.4em;
        width: 14em;
        top: 0.3em;
        left: 0em;
      }

    }

    div{
      float: right;
      margin-right: 0.4em;
      margin-top: 0.65em;
      button {
        display: inline-block;
        position: relative;
        outline: none;
        border: none;
        background: none;
        color: black;
        text-decoration: none;
        font-size: 1.2em;
        margin-right: .8em;
        font-weight: 300;
        font-family: Quicksand, sans-serif;
        cursor: pointer;

        &.selected {
          font-weight: 600;
        }

        &:hover {
          &:before, &:after {
            width: 100%;
          }

          &:before {
            top: calc(100% + 2px);
          }

          &:after {
            top: -2px;
          }
        }

        &:before, &:after {
          content: "";
          display: block;
          position: absolute;
          height: 2px;
          background-color: black;
          width: 0;
          border-radius: 4px;
          transition: width 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
        }

        &:before {
          right: 0;
          top: -2px;
        }

        &:after {
          left: 0;
          top: calc(100% + 2px);
        }
      }
    }

  }
</style>

<nav>
    <a href='https://marchewczyk.eu' class='nav_logo'><img src={logo} alt=''/></a>
    <div>
        {#each views as v}
            <button on:click={() => view = v.name} class:selected={view === v.name}>
                {v.text}
            </button>
        {/each}
    </div>
</nav>
