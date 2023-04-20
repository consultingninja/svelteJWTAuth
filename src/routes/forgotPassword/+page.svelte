<script lang="ts">

    export let form;

    console.log(form);
    
    </script>
    
    <div class="login-wrapper">
    <h2>*ADD WEBSITE LOGO HERE*</h2>
    
        <form  method="post" action="?/sendReset">

            <div class="form-item">
                <label for="email" >Email<sup><small class="required">*</small></sup></label>
                <input id="email" type="email" name="email" required />
            </div>
        
            <div class="form-item">
                <button type="submit" class="btn btn-primary">Send Email</button>
            </div>
            <div class="form-item">
                {#if form}
                <small class:error={form?.error} class:success={!form?.error}>{form?.message}</small>
                {/if}
                </div>
        
        </form>
    </div>
    
    <style>
        div{
            color: #FFF;
            margin-bottom: .5em;
        }
        label{
            padding-right: .5em;
        }
        .error{
            padding-left: .5em;
            color: #ff0000;
        }
        .success{
            padding-left: .5em;
            color:#00ff44;
        }
        .required{
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
        .login-wrapper{
            height: 100vh;
        }
    </style>