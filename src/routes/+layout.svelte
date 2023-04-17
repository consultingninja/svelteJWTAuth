
<script lang="ts">
import Navbar from "$lib/Navbar.svelte";
import {user,isOnUserStyledPage} from '../stores';


$:User = $user;

</script>

<div class='main-app' class:default={!$isOnUserStyledPage}>
    <Navbar/>
        <slot>
        </slot>
</div>



<svelte:head>
    <style>
        body{
            margin:0;
        }
    </style>
    		<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
</svelte:head>


	

<style>
    .main-app{
        margin: 0;
        background-color: #242424;
        color: #ffffff;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100vh;
        width: 100vw;

    }
    .top{
        height: 100vh;
        width: 100vw;
        flex-direction: column;
        align-items: center;
    }
    .default{
        height: 100vh;
        width: 100vw;
        flex-direction: column;
        align-items: center;
    }
    .side{
        height: 100vh;
        flex-direction: row;
        align-items: flex-start;

    }
    .main-content{
        background-color: var(--theme-primaryColor);
        color: var(--theme-textColor);
        height: 100vh;
        width: 100vw;
        display: flex;
        flex-direction: column;
        align-items: center;

    }


</style>