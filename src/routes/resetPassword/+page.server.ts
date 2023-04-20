import { dbConn } from "../../dbConn";
import { findUserByEmail,findUserByEmailWithPassword, updateUserPassword } from "../../backendUtils";
import { redirect,fail } from "@sveltejs/kit";
import type {Actions,RequestEvent,ActionFailure, Redirect} from '@sveltejs/kit';
import { SECRET_RESET,SECRET_INGREDIENT } from "$env/static/private";
import { checkPassword } from "../../passwordCheck";
import bcryptjs from 'bcryptjs';
import type { resetFormResponse } from "../../types/form";


export async function load({url}){
    const searchEmail = url.searchParams.get('email');
    const searchToken = url.searchParams.get('token');
    console.log("email ",searchEmail);
    console.log("token ",searchToken);
    //if either piece of information is missing we leave
    if(!searchEmail || !searchToken) throw redirect(302,'/login');
    console.log("email ",searchEmail);
    console.log("token ",searchToken);

    let auth = {
        authorized: false,
        email: searchEmail
    }
    if(searchEmail && searchToken){
        const collection = await dbConn();
        //attempt to find user from database
        const userAttemptingReset = await findUserByEmailWithPassword(collection,searchEmail);
        //check to make sure there is an unexpired reset timer set for user if not redirect
        if(!userAttemptingReset.resetTimer)throw redirect(302,'/login');
        console.log("Made it through resetTimer there check")
        const currentTime = Date.now();
        const resetTimer = userAttemptingReset.resetTimer;

        // make sure 5 minutes hasn't passed since reset email was sent. if so redirect
        if(currentTime > resetTimer) throw redirect(302,'/login');
        console.log("Made it through resetTimer time check")
        //finally check to make sure the reset token is valid
        //for this check we put the token first and the known inputs second

        const authAttempt = await bcryptjs.compare(SECRET_RESET.concat(searchEmail.toString()),searchToken);

        //If reset token doesn't check out then we also have to kick off page
        if(!authAttempt) throw redirect(302,'/login');
        console.log("Made it through auth check")
        //if everything checks out return authorized and email to page
        auth.authorized =true;
        return auth

    }



    return{auth}
}


export const actions:Actions = {
    resetPassword: async({request,url}:RequestEvent): Promise<resetFormResponse|ActionFailure<resetFormResponse> | Redirect> =>{

        const resetFormData = await request.formData();
        const password = resetFormData.get('password')??'';
        const confirmPassword = resetFormData.get('confirmPassword')??'';
        const email = resetFormData.get('email')??'';

        const searchEmail = url.searchParams.get('email');


        console.log("password:",password);
        console.log("confirmed:",confirmPassword);
        console.log("email:",email);

        let ResetResponse:resetFormResponse = {
            error: false,
            message: "",
            weakPassword: false,

        }

        if(password.toString() !== confirmPassword.toString()){
            ResetResponse.error = true;
            ResetResponse.message = "Passwords do not match!"
            return fail(400,ResetResponse)
        } 


        if(!email){
            ResetResponse.error = true;
            ResetResponse.message = "Email missing!"
            return fail(400,ResetResponse)
        }

        const isPassStrong = checkPassword(password.toString());

        if(!isPassStrong){
            ResetResponse.weakPassword = true;
            ResetResponse.error = true ;
            ResetResponse.message = "Password does not meet requirements!"
            return fail(400,ResetResponse)
        }

        try{
            const collection = await dbConn();
            //attempt to find user from database
             const userAttemptingReset = await findUserByEmailWithPassword(collection,email.toString());
             //check to make sure there is an unexpired reset timer set for user if not redirect
             if(!userAttemptingReset.resetTimer){
                ResetResponse.error = true;
                ResetResponse.message = "Problem with reset timer, re-send link."
                return fail(400,ResetResponse)
             }

            const currentTime = Date.now();
            const resetTimer = userAttemptingReset.resetTimer;
            // make sure 5 minutes hasn't passed since reset email was sent. if so error
            if(currentTime > resetTimer){
                ResetResponse.error = true;
                ResetResponse.message = "Problem with reset timer, re-send link."
                return fail(400,ResetResponse)
            }

            //with those check done lets build our updated user
            const hashedPassword = await bcryptjs.hash(password.toString(),12);
            const newUser = {
                ...userAttemptingReset,
                password: hashedPassword
            }

            console.log("newUser",newUser)

            await updateUserPassword(collection,newUser);
            throw redirect(302,'/login')

        }
        finally{
            return ResetResponse
        }


        

        



    }
}