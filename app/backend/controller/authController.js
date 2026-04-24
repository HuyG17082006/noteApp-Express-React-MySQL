
import tokenService from "../service/tokenService.js";
import userService from "../service/userService.js";

import sendRespone from "../utils/sendRespone.js";

const THREE_DAYS = 1000 * 60 * 60 * 24 * 3;

export default {
    login: async (req, res) => {
        const { username = '', password = '' } = req.body || {};

        if (!username || !password)
            return sendRespone(res, {
                    resStatus: 400,
                    message: 'Thiếu username hoặc password'
                })

        const result = await userService.login(username, password);
        const { isOk, message, data = null } = result;

        if (!isOk)
            return sendRespone(res, {
                resStatus : 401,
                message
            })

        const { accessToken, refreshToken, user } = data;

        res.cookie('refreshToken', refreshToken, {
            maxAge: THREE_DAYS,
            httpOnly: true,
            secure : true,
            sameSite: 'none'
        })

        return sendRespone(res, {
            resStatus : 200,
            message,
            accessToken,
            user
        })
    },

    register: async (req, res) => {
        const { username = '', password = '', email = '' } = req.body || {};

        if (!username || !password || !email)
            return sendRespone(res, {
                    resStatus: 401,
                    message: 'Thiếu username, email hoặc password'
                })

        const result = await userService.register(username, password, email);
        
        return sendRespone(res, {
            resStatus : result.isOk ? 200 : 400,
            ...result
        })
    },

    refresh: async (req, res) => {

        const refreshToken = req.cookies?.refreshToken;
        if (!refreshToken)
            return sendRespone(res, {
                    resStatus: 401,
                    message: 'Không có refreshToken'
                })

        const isTokenChanged = await tokenService.refresh(refreshToken);
        const { isOk, message, data } = isTokenChanged;
        if (!isOk)
            return sendRespone(res, {
                resStatus : 401,
                message
            })

        const { newRefreshToken, newAccessToken } = data

        res.cookie('refreshToken', newRefreshToken, {
            maxAge: THREE_DAYS,
            httpOnly: true,
            secure : true,
            sameSite: 'none'
        })

        return sendRespone(res, {
                resStatus : 200,
                accessToken : newAccessToken,
                message
            })
    },

    logout: async (req, res) => {
        const userId = req.userId || '';
        const refreshToken = req.cookies?.refreshToken;

        if (!refreshToken) 
            return sendRespone(res, {
                resStatus : 401,
                message: 'Không có refreshToken'
            })

        const result = await tokenService.deleteToken(userId, refreshToken);

        if (!result.isOk) 
            return sendRespone(res, {
                resStatus : 400,
                ...res
            })

        res.clearCookie('refreshToken');

        return sendRespone(res, {
                resStatus : 200,
                message : 'Đăng xuất thành công'
            })
    }
}