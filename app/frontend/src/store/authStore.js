let accessToken = null;

export default {
    setToken : (token) => {
        accessToken = token;
    },

    getToken : () => accessToken,

    deleteToken : () => {
        accessToken = null;
    }
}