import Fetch from "./Fetch.js"
import authStore from "../store/authStore.js";

export default {
    login: async ({ username, password }) => {

        const options = {
            method: "POST",
            body: JSON.stringify({ username, password })
        }

        const res = await Fetch('/auth/login', options);

        const { isOk, message, data } = res;

        if (!isOk)
            return {
                isOk: false,
                message
            }

        const { accessToken } = data;

        authStore.setToken(accessToken);
            
        return {
            isOk: true,
            message
        };
    },

    register: async ({ username, password, email }) => {

        const options = {
            method: "POST",
            body: JSON.stringify({ username, password, email })
        }

        const res = await Fetch('/auth/register', options);

        const { isOk, message } = res;

        if (!isOk)
            return {
                isOk: false,
                message
            }

        return {
            isOk: true,
            message
        };
    },

    refresh: async () => {
        const options = {
            method: "POST",
        }

        const res = await Fetch('/auth/refresh', options);

        const { isOk, message, data } = res;

        if (!isOk)
            return {
                isOk: false,
                message
            }

        authStore.setToken(data);
            
        return {
            isOk: true
        };
    }
}