let initalState = {
  user: { email: " ", password: " ", isAuthenticated: false },
  eror:""
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
    }

  }
  console.log("state", state);
  return { ...state };
}

export default reducer;
