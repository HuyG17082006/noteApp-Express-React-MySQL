import authStore from "../store/authStore.js";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default async (url, options = {}) => {

    const token = authStore.getToken();

    const header = {
        "Content-type" : "application/json"
    };

    if (token) {
        header["Authorization"] = `Bearer ${token}`;
    }

    const RequestOptions = {
        ...options,
        headers : {
            ...header,
            ...options.headers
        }
    }

    try {
        const res = await fetch(`${BASE_URL}${url}`,RequestOptions);

        const data = await res.json();
     
        if (!res.ok)
            return {
                isOk : false,
                message : data.message || 'Lỗi khi gửi yêu cầu',
                data : null
            }
        
        return {
            isOk : true,
            data
        }
    } catch (error) {

        return {
            isOk : false,
            message : "Lỗi mạng",
            data : null
        }
    }

}

