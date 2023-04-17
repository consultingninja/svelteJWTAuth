import type { RequestEvent } from './$types';
import jwt from 'jsonwebtoken';
import { SECRET_INGREDIENT } from '$env/static/private';
import { findUserByUrl } from '../../../backendUtils';
import { dbConn } from '../../../dbConn';


export const POST  = async({cookies,request}:RequestEvent)=>{
    const authToken = cookies.get('authToken');

    try{
        if(!authToken) return new Response(JSON.stringify({error: true,success:false,message: "Auth Token not found!", data: undefined}),{status: 400});

        const claims = jwt.verify(authToken,SECRET_INGREDIENT);
        if(!claims)return new Response(JSON.stringify({error: true,success:false,message: "Not Authorized!", data: undefined}),{status: 401});

        if(authToken && claims){
            const collection = await dbConn();
            const fullUser = await findUserByUrl(collection,claims.authedUser.URL);
            const {password,...userMinusPassword} = fullUser;
            return new Response(JSON.stringify({error: false,success:true,message: "Authorized!", data:userMinusPassword }),{status: 200})

        }
    }
    catch(error){
        return new Response(JSON.stringify({error: true,success:false,message: "Error validating credentials", data: undefined}),{status: 401});
    }


    return new Response(JSON.stringify({error: true,success:false,message: "Unknown error", data: undefined}),{status: 401});

}