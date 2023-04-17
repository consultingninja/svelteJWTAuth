import {SECRET_INGREDIENT} from '$env/static/private';
import { dbConn } from './dbConn';
import { findUserByUrl } from './backendUtils';
import jwt from 'jsonwebtoken';

export async function handle({ event, resolve }) {
    const authToken = event.cookies.get('authToken');
    try{
        if(!authToken) event.locals.authedUser = undefined;

        const claims = jwt.verify(authToken,SECRET_INGREDIENT);
        if(!claims) event.locals.authedUser = undefined;

        if(authToken && claims){
            const collection = await dbConn();
            const fullUser = await findUserByUrl(collection,claims.authedUser.URL);
            const {password,...userMinusPassword} = fullUser;
            event.locals.authedUser = userMinusPassword;

        }
    }
    finally{
        const response = await resolve(event);
        return response;
    }

  }