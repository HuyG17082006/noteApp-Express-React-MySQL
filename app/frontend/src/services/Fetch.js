import authStore from "../store/authStore.js";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default async (url, options = {}) => {

    let token = authStore.getToken();

    const header = {
        "Content-type": "application/json"
    };

    if (token) {
        header["Authorization"] = `Bearer ${token}`;
    }

    const RequestOptions = {
        ...options,
        credentials: "include",
        headers: {
            ...header,
            ...options.headers
        }
    }

    try {
        let res = await fetch(`${BASE_URL}${url}`, RequestOptions);

        let data = await res.json();

        if (!res.ok) {

            if (data.isAccessTokenExpired) {

                const refreshRes  = await fetch(`${BASE_URL}/auth/refresh`, {
                    method: "POST",
                    headers : {
                        "Content-type": "application/json"
                    },
                    credentials: "include"
                });

                const refreshData = await refreshRes.json();

                if (!refreshRes.ok) {
                    authStore.deleteToken();
                    return {
                        isOk: false,
                        message : refreshData.message
                    }
                }

                authStore.setToken(refreshData.accessToken);

                const newToken = authStore.getToken();

                RequestOptions.headers["Authorization"] = `Bearer ${newToken}`

                res = await fetch(`${BASE_URL}${url}`, RequestOptions);
                
                data = await res.json();

            }
            else {
                return {
                    isOk: false,
                    message: data.message || 'Lỗi khi gửi yêu cầu',
                    data: null
                }
            }
        }

        return {
            isOk: true,
            message: data.message,
            data
        }

    } catch (error) {

        return {
            isOk: false,
            message: "Lỗi mạng",
            data: null
        }
    }
}

