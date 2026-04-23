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
        const res = await fetch(`${BASE_URL}${url}`, RequestOptions);

        const data = await res.json();

        if (!res.ok) {

            if (data?.isAccessTokenExpired) {

                const refreshRes = await fetch(`${BASE_URL}/auth/refresh`, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    credentials: "include"
                });

                const refreshData = await refreshRes.json();

                if (!refreshRes.ok) {
                    authStore.deleteToken();
                    return {
                        isOk: false,
                        message: refreshData.message
                    }
                }

                authStore.setToken(refreshData.accessToken);

                const retryOptions = {
                    ...options,
                    credentials: "include",
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${refreshData.accessToken}`
                    }
                };

                const reRes = await fetch(`${BASE_URL}${url}`, retryOptions);

                // const reData = await reRes.json();

                // console.log(reData)

                // if (!reRes.ok)
                //     return reData;

                // return reData;

                return await reRes.json();
            }
            else {
                return {
                    isOk : false,
                    ...data,
                    message : data.message || "Lỗi khi gửi yêu cầu"
                }
            }
        }

        return {
            isOk : true,
            ...data
        }

    } catch (error) {

        return {
            isOk: false,
            message: "Lỗi mạng",
            data: null
        }
    }
}

