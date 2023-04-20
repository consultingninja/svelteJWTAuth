<script lang="ts">
    import {enhance} from '$app/forms';
    import {user} from '../../stores';
    export let form;
    export let data;

    $:clearUser = data?.clearUser;

    $:{
        if(clearUser) user.set(undefined);
    }

</script>

<h2>*ADD WEBSITE LOGO HERE*</h2>

<form use:enhance method="post" action="?/login">
    <div class="form-item">
        <label for="email">Email<sup><small class="required">*</small></sup></label>
        <input value={form?.email??''} id="email" type="email" name="email" required />
    </div>
    <div class="form-item">
        <label for="password">Password<sup><small class="required">*</small></sup></label>
        <input  id="password" type="password" name="password" required />
    </div>

    <div class="form-item">
        {#if form?.error}
        <small>{form?.message}</small>
        {/if}
    </div>

    <div class="form-item">
        <button type="submit">Login</button>
    </div>

    <div class="form-item">
        <a class="reset-link" href="/forgotPassword"><small>Forgot Password?</small></a>
    </div>


</form>

<style>
    div{
        color: #FFF;
        margin-bottom: .5em;
    }
    label{
        padding-right: .5em;
    }
    button{
        width: 100%;
        background-color: #FFF;
        transition: all 0.3s ease-in;
    }
    button:hover{
        cursor: pointer;
        text-decoration: underline;
        color: #FFF;
        background-color: #4d4c4c;
        transition: all 0.3s ease-in;
    }
    .form-item{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .required{
            padding-left: .5em;
            color: #ff0000;
        }
    .reset-link{
            color: #FFFFFF;
            text-decoration: none;
    }
    .reset-link:hover{
        text-decoration: underline;
    }
</style>