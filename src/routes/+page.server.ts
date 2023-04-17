

export async function load({fetch}){
        //Check for auth cookie
        try{
            const checkAuthResonse =  await fetch('/api/checkAuth',{method: 'POST',credentials: 'include'});
            const checkAuthData = await checkAuthResonse.json();
            const checkAuthResult = checkAuthData.success;
            console.log("authedUser",checkAuthData.data);
            if(checkAuthResult){
                const {password,...userMinusPassword} = checkAuthData.data;
                return{userMinusPassword}
            }
        }
        catch(error){
            return{}
        }

        return{}

}