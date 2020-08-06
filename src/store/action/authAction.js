function login(user) {
    return{ type: "LOGIN", payload: user};
}
function loginFail(message){
    return {type: "LOGIN_FAIL", payload:message }
}

 function loginMiddlewave (user){
    return (dispatch) => {
        try{
            console.log("user",user)
            if(!user.email || !user.password){
                dispatch(loginFail("fail roi"))
                return;
            }else{
                 dispatch(login(user))
            }
        }catch(error){

        }
    }
}
export default loginMiddlewave;
