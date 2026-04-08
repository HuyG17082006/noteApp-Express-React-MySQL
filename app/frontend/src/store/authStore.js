let accessToken = null;
let username = null;
let email = null;

export default {
    setToken : (_accessToken) => {
        accessToken = _accessToken
    },

    setUser : (_username, _email) => {
        username = _username;
        email = _email;
    },

    logout : () => {
        accessToken = null;
        username = null;
        email = null;
    },

    getToken : () => accessToken
}