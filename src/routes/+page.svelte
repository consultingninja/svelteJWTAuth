<script lang="ts">
    import {goto} from '$app/navigation';
    import {user} from '../stores';
    export let data;

    let navChoice =  '/';

    function handleNav(e:any){
        console.log(e.target.value);
        goto(e.target.value,{noScroll: false})
    }
    $:User = data?.authedUser;

    $:{
        const newUser = data?.authedUser;
        user.set(newUser);
    }

    console.log(data);

    
</script>


<h1>Welcome to The Photo App {User?.firstName??''}</h1>
<p>Visit my channel <a href="https://www.youtube.com/channel/UCwPrPv9eS7Xgfp_wi7uxt0g">@ConsultingNinja</a> to see more great videos!</p>

{#if data.URLList.length}
<p>Not sure where to go? Check out one of these users!</p>
<form>
    <select bind:value={navChoice} name="urlList" on:change={handleNav}>
        <option value="/">User List</option>
    {#each data.URLList as URL}
        <option value={URL}>{URL}</option>
    {/each}
    </select>
</form> 
{/if}

<style>
    a{
        color:#007bff;
        text-decoration: none;
    }
    a:hover{
        text-decoration: underline;
        text-decoration-color: #FFFFFF ;

    }
</style>