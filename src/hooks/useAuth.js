
//STATE
const state = {
    authenticated: false,
    user: {},
    token: ""
};

//GETTER
const isAuthenticated = (() => state.authenticated);
const getUser = (() => state.user);
const getToken = (() => state.token);

//SETTER
function setUser(newUser) {
    state.user = newUser
}
function setToken(newToken){
    state.token = newToken;
    //localStorage.setItem("_token", newToken);
    state.authenticated = true;
}

// LOGAUTH
function logOut() {
    state.token = "";
    //localStorage.removeItem("_token");
    state.authenticated = false;
    state.user = {};
}


export default { isAuthenticated, getUser, getToken, setUser, setToken, logOut}