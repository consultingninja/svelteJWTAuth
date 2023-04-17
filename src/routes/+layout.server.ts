import { returnURLsList} from "../backendUtils.js";
import { dbConn } from "../dbConn.js";



export async function load({}){

    //Gather all User Data
    let dbError = {
        hasError: false,
        error: ''
    }
    let URLList:string[] = [];

    try{
        const collection = await dbConn();
        URLList = await returnURLsList(collection);
        //console.log("User list", URLList);
        return{dbError,URLList}
    }
    catch(error:any){
       dbError.hasError = true;
       dbError.error = error.message?? 'Error Connecting to DB or retrieving URL List';
    }
    finally{
        return{dbError,URLList}
    }

}