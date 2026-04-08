import Fetch from "./Fetch.js"

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

        const { accessToken, user } = data;

        authStore.setToken(accessToken);
        authStore.setUser(user.username, user.email);

        return {
            isOk: true,
            data
        };
    }
}