<script lang="ts">

    export let form;
    export let data;
    import {layout, carousel,hero,message,primaryColor,secondaryColor,textColor,user} from '../../../stores';

    $:User = data?.userMinusPassword;

    $:{
        const newUser = data?.userMinusPassword;
        user.set(newUser);
    }

    $:saveResult = form?.message;

    $:{
        if(saveResult)setTimeout(()=>{
            saveResult = '';
        },3000)
    }

</script>
<div>
<h1>{`Welcome to your dashboard ${data?.userMinusPassword?.firstName}!`}</h1>

<h2>
    Admin Options
    <sup title="These options will be reflected only for your URL."><small>i</small></sup>
</h2>

<form method="post" action="?/saveOptions">
    <label for="layout">Navigation Location</label>
    <select name="layout" value={User?.options.layout}>
        <option value="top">Top</option>
        <option value="side">Side</option>
    </select>
    <hr />

    <div class="layout-color-option">
        <label for="primary">Primary Color</label>
        <input type="color" id="primary" name="primary" value={User?.palette.primary?? "242424"} />
    </div>
    <div class="layout-color-option">
        <label for="secondary">Secondary Color</label>
        <input type="color" id="secondary" name="secondary" value={User?.palette.secondary?? "FFFFFF"}/>
    </div>
    <div class="layout-color-option">
        <label for="text">Text Color</label>
        <input type="color" id="text" name="text" value={User?.palette.text?? "FFFFFF"} />
    </div>
    <hr />
    <div class="layout-option">
        <label for="carousel">Carousel</label>
        <input type="checkbox" name="carousel" value="carousel" checked={User?.options.carousel}  />

    </div>
    <div class="layout-option">
        <label for="hero">Hero</label>
        <input type="checkbox" name="hero" value="hero" checked={User?.options.hero} />
    </div>
    <div class="layout-option">
        <div>
            <label for="message">Custom Message</label>
        </div>
        <textarea  cols={20} name="message" value={User?.options.message}  />
    </div>

    <div class="layout-option">
        <button type="submit">Save</button>
        <button>Save & View</button>
    </div>


</form>
</div>

<style>
    h1,h2{
        margin-top: .25em;
        margin-bottom: .25em;
    }
    select{
        width: 100%;
    }
    .layout-option{
        margin-bottom:.5em;
    }
    .layout-color-option{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: .2em;
    }
    small{
        display: inline-block;
        width: 1em;
        height: 1em;
        border: 1px solid #FFFFFF;
        border-radius: 50%;
        padding: 2px;
    }
    sup{
        display: inline-block;
        width: 1em;
        height: 1em;
        text-align: center;
    }
    button{
        color:#FFF;
        background-color: #5b5b5b;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
        border: 0;

    }
    button:hover{
        cursor: pointer;
        opacity: .8;
        box-shadow: inset 2px #242424;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
        outline: 2px solid ;
    }

</style>


