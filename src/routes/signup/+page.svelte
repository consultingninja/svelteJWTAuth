<script lang="ts">
import { enhance } from '$app/forms';
export let form;

</script>



<h2>*ADD WEBSITE LOGO HERE*</h2>

<form method="post" action="?/signup">
    <div class="form-item">
        <label for="firstName" >Firstname<sup><small>*</small></sup></label>
        <input value={form?.firstName?? ''} id="firstName" type="text" name="firstName" required />
    </div>

    <div class="form-item">
      <label for="lastName" >Lastname<sup><small>*</small></sup></label>
      <input value={form?.lastName?? ''} id="lastName" type="text" name="lastName" required />
  </div>

  <div class="form-item">
      <label for="email" >Email<sup><small>*</small></sup></label>
      <input class:fieldError={form?.emailUsed} value={form?.email?? ''} id="email" type="email" name="email" required />
  </div>

    <div class="form-item">
        <label for="password">Password<sup><small>*</small></sup></label>
        <input class:fieldError={form?.weakPassword} type="password" id="password" name="password" required />
    </div>

    <div class="form-item">
        <label for="userurl">Choose a URL<sup><small>*</small></sup></label>
        <input value={form?.urlChoice?? ''} class:fieldError={form?.urlTaken} type="text" id="userurl" name="userurl" required />
    </div>

    <div class="form-item">
    {#if form?.error}
    <small>{form?.message}</small>
    {/if}
    </div>

    <div class="form-item">
        <button type="submit" class="btn btn-primary">Sign Up</button>
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
    small{
        padding-left: .5em;
        color: #ff0000;
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
    .fieldError{
        outline: 2px solid #ff0000;
    }
</style>