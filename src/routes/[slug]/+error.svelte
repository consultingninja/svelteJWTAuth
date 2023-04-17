<script lang='ts'>
import {page} from '$app/stores';
import {goto} from '$app/navigation'
export let data;

    $: navChoice = data?.URLList[0]?? '';

    function handleNav(e:any){
        console.log(e.target.value);
        goto(e.target.value,{noScroll: false})
    }
</script>


<div>
<h2>{$page?.error?.code}</h2>
<h2>{$page?.error?.message}</h2>   
<p>The page you are trying to visit does not exist!</p>
<p>Check your spelling, <a href="/">Return to safety</a> or choose from our list!</p>
{#if data?.URLList.length}
<p>Not sure where to go? Check out one of these users!</p>
<form>
    <select bind:value={navChoice} name="urlList" on:change={handleNav}>
    {#each data.URLList as URL}
        <option value={URL}>{URL}</option>
    {/each}
    </select>
</form> 
{/if}
</div>

<style>
    a{
        color:#007bff;
        text-decoration: none;
    }
    a:hover{
        text-decoration: underline;
        text-decoration-color: #FFF ;

    }
</style>
