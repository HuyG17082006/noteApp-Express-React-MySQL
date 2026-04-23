const CURRENT_USER_KEY = 'accessToken'

let accessToken = localStorage.getItem(CURRENT_USER_KEY) || null;
let isVerify = false;

export default {
    setToken : (token) => {
        localStorage.setItem(CURRENT_USER_KEY, token);
        isVerify = true;
    },

    getToken: () => localStorage.getItem(CURRENT_USER_KEY) || null,

    deleteToken: () => {
        accessToken = null;
        localStorage.removeItem(CURRENT_USER_KEY);
    },

    verify : () => {
        return isVerify;
    }
}
