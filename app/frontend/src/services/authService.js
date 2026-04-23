import Fetch from "./Fetch.js"

export default {
    login: async ({ username, password }) => {

        const options = {
            method: "POST",
            body: JSON.stringify({ username, password })
        }

        return await Fetch('/auth/login', options);
    },

    register: async ({ username, password, email }) => {

        const options = {
            method: "POST",
            body: JSON.stringify({ username, password, email })
        }

        return await Fetch('/auth/register', options);

    },

    refresh: async () => {
        const options = {
            method: "POST",
        }

        return await Fetch('/auth/refresh', options);
    },

    logout : async () => {
        const options = {
            method: "POST",
        }

        return await Fetch('/auth/logout', options);
    }
}