let initalState = {
  user: { email: " ", password: " ", isAuthenticated: false },
  eror:"",
};

function reducer(state = initalState, action) {
  switch (action.type) {
    case "LOGIN":
        console.log("aaaaa")
      state.user.email = action.payload.email;
      state.user.password = action.payload.password;
      state.user.isAuthenticated = true;
      state.error = ""
      break;
    case "LOGIN_FAIL":{
        state.error = action.payload;
        break;
    }
    case "SIGN_OUT":
        state.user.isAuthenticated = false;
        state.user.email = "" ;
        state.user.password = "" ;
        state.error = "";
        alert("Sign-out completely");
  }
  console.log("state", state);
  return { ...state };
}

export default reducer;
