import type { Actions, RequestEvent, ActionFailure, Redirect } from '@sveltejs/kit';
import type { Options, Palette, UserWithoutPassword } from '../../../types/user.js';
import type { adminFormResponse } from '../../../types/form.js';
import { updateUserAdminOptions } from "../../../backendUtils.js";
import { redirect } from '@sveltejs/kit';
import { dbConn } from '../../../dbConn.js';


export async function load({fetch,params,locals}){
    if(!locals.authedUser) throw redirect(302,'/login');
    const requestedUrl = params.slug;
    console.log(requestedUrl);

    let dbError = {
        hasError: false,
        error: ''
    }

    let userMinusPassword:UserWithoutPassword | undefined = undefined;

    try{
        const checkAuthResonse =  await fetch('/api/checkAuth',{method: 'POST',credentials: 'include'});
        if(checkAuthResonse.status > 200) throw redirect(302,'/login');
        const checkAuthData = await checkAuthResonse.json();
        const checkAuthResult = checkAuthData.success;
        console.log("authedUserDash",checkAuthData.data);
        if(!checkAuthResult) throw redirect(302,'/login')

        const {password,...restOfUser} = checkAuthData.data ;
        userMinusPassword = restOfUser;

        if(requestedUrl !== userMinusPassword?.URL) throw redirect(302,`/${userMinusPassword?.URL}/dashboard`)
    }
    finally{
        return {userMinusPassword}
    }


}

export const actions:Actions = {
    saveOptions: async({request,fetch}:RequestEvent): Promise<adminFormResponse|ActionFailure<adminFormResponse> | Redirect> =>{
        const adminFormData = await request.formData();
        const layout = adminFormData.get('layout')??'';
        const primary = adminFormData.get('primary')??'';
        const secondary = adminFormData.get('secondary')??'';
        const text = adminFormData.get('text')??'';
        const carousel = adminFormData.get('carousel')? true: false;
        const hero = adminFormData.get('hero')? true: false;
        const message = adminFormData.get('message')??'';

        const options:Options ={
            layout: layout.toString(),
            carousel: carousel,
            hero: hero,
            message: message.toString()

        }
        const palette:Palette={
            primary: primary.toString(),
            secondary: secondary.toString(),
            text: text.toString(),
        }
        let adminSaveResponse = {
            layout,
            primary,
            secondary,
            text,
            carousel,
            hero,
            message,
            formMessage: '',
            error: false,

        }
        let user;

        try{
            const checkAuthResonse =  await fetch('/api/checkAuth',{method: 'POST',credentials: 'include'});
            const checkAuthData = await checkAuthResonse.json();
            const checkAuthResult = checkAuthData.success;
            console.log("authedUserDash",checkAuthData.data);
            if(!checkAuthResult) throw redirect(302,'/login')

            user = checkAuthData.data;
            const collection = await dbConn();
            user.options = options;
            user.palette = palette;
            const updateUserOptions = await updateUserAdminOptions(collection,user);
            console.log("updatedOptions",updateUserOptions);
            adminSaveResponse.message = updateUserOptions.value?.toString()?? '' ;

        }
        finally{
            return adminSaveResponse
        }




        
    },
    saveAndViewOptions: async()=>{}
}

