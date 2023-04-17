<script lang="ts">
    import {user} from '../../stores';
    export let data;

    $:NoAuthUser = data?.noAuthUser;

</script>

<div>
    <h1>Check out the wonderful work of {NoAuthUser?.firstName}</h1>
        {#if NoAuthUser?.options.message}
        <h2 class="message">{NoAuthUser?.options.message}</h2>
        {/if}
</div>

<style>
    h1 {
        color: #FFFFFF;
        margin-block: .5em;
    
    }
    h2{
        margin-block: .5em; 
    }
    a{
    color: #e75454
    }
</style>