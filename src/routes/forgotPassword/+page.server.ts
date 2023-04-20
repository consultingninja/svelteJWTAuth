import type {Actions,ActionFailure,RequestEvent} from '@sveltejs/kit';
import type { forgotFormResponse } from '../../types/form';
import { fail} from '@sveltejs/kit';
import { findUserByEmail, setResetToken } from '../../backendUtils';
import { dbConn } from '../../dbConn';
import { SECRET_RESET,SECRET_EMAIL_KEY } from '$env/static/private';
import bcryptjs from 'bcryptjs';

export const actions:Actions = {
    sendReset: async ({request,fetch}:RequestEvent): Promise<forgotFormResponse | ActionFailure<forgotFormResponse>> =>{

        const forgotFormData = await  request.formData();
        const email = forgotFormData.get('email')?? '';

        let forgotFormResponse:forgotFormResponse = {
            email: email.toString(),
            error: false,
            message: ''
        }
        console.log(email.toString());

        try{
            const collection = await dbConn();
            const attemptToFindUser = await findUserByEmail(collection,email.toString());
            console.log(attemptToFindUser.firstName);

            if(!attemptToFindUser){
                forgotFormResponse.error = true;
                forgotFormResponse.message = "Unable to find user."
                return fail(400,forgotFormResponse)
            }

            if(attemptToFindUser){
                const userFirstName = attemptToFindUser.firstName.toString();
                const token = await bcryptjs.hash(SECRET_RESET.concat(email.toString()),12);

                const requireds = {
                    service_id:'service_w24km8h',
                    template_id: 'template_kxmdkzj',
                    user_id:'K8bFv91-NHrpay_BB',
                    accessToken:SECRET_EMAIL_KEY,
                    template_params:{
                        email,
                        firstName:userFirstName,
                        token: token
                    }
                }

                const response = await fetch('https://api.emailjs.com/api/v1.0/email/send',{
                    method: "POST",
                    body:JSON.stringify(requireds),
                    headers:{
                        'content-type': 'application/json',
                    }
                })

                if(response.status === 200){
                    const currentTime = parseInt(Date.now().toString());
                    const fiveMins = currentTime + 300000;

                    const updatedUser = {
                        ...attemptToFindUser,
                        resetTimer: fiveMins
                    }
                    console.log("updated",updatedUser)
                    const updateResetToken = await setResetToken(collection,updatedUser);
                    const updateResetTokenResult = updateResetToken.ok === 1? true : false;

                    if(!updateResetTokenResult) {
                        forgotFormResponse.error = true;
                        forgotFormResponse.message = "Error setting reset timer, please try again shortly!"
                    }
                    if(updateResetTokenResult){
                        forgotFormResponse.error = false;
                        forgotFormResponse.message = "Check your email!";
                    }
                    
                }
                if(response.status === 400){
                    console.log(response);
                    forgotFormResponse.error = true;
                    forgotFormResponse.message = "Error sending email!";
                    return fail(400,forgotFormResponse)
                }
            }

        }
        finally{
            return forgotFormResponse
        }

    }
}