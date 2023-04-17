<script>
    import {user,isOnUserStyledPage} from '../stores';

    $:thisUser = $user;

</script>

<nav class="nav-base" class:default={!$isOnUserStyledPage}  class:top={thisUser?.options.layout ==='top'} class:side={thisUser?.options.layout ==='side'} style="--theme-primaryColor: {thisUser?.palette.primary ?? "#242424"}; --theme-textColor: {thisUser?.palette.text ?? "#FFFFFF"}; --theme-secondaryColor: {thisUser?.palette.secondary ?? "#FFFFFF"}">
    <a href="/">Home</a>
    {#if !thisUser }
    <a href="/signup">Sign Up</a>
    <a href="/login">Login</a>
    {/if}

    {#if thisUser }
    <a href={`/${thisUser.URL}`}>Your Page</a>
    <a data-sveltekit-preload-data="off" href={`/${thisUser.URL}/dashboard`}>Dashboard</a>
    <a data-sveltekit-preload-data="off" href='/logout'>Logout</a>
    {/if}
</nav>

<style>
    .nav-base{
        display: flex;
    }
    .default{
        width:100%;
        padding-top: 1em;
        background: linear-gradient(to right, #FFFFFF, #242424);
        flex-direction: row;
        justify-content: center;
        border-bottom: 1px solid rgba(122, 117, 117,0.3);
        padding-bottom: 1em;
    }
    .top{
        width:100%;
        padding-top: 1em;
        background: linear-gradient(to right, var(--theme-secondaryColor), var(--theme-primaryColor));
        flex-direction: row;
        justify-content: center;
        border-bottom: 1px solid rgba(122, 117, 117,0.3);
        padding-bottom: 1em;

    }
    .side{
        height:100vh;
        padding-right: 1em;
        flex-direction: column;
        justify-content: center;
        background: linear-gradient(to bottom, var(--theme-secondaryColor), var(--theme-primaryColor));
        border-right: 1px solid rgba(122, 117, 117,0.3);


    }
    .side a{
        color:#FFF;
        text-decoration: none;
        margin-bottom: 1em;
        font-size: larger;
    }

    a{
        color:#000000;
        text-decoration: none;
        margin-left: 1em;
        font-size: larger;
        padding:2px;
    }
    a:hover{
        opacity: .8;
        text-decoration: underline;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
        padding:2px;

    }

</style>