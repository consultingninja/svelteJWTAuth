


export async function load({locals}){
    let authedUser = undefined
    if(locals.authedUser) authedUser = locals.authedUser

    console.log(authedUser);
        return{authedUser}

}