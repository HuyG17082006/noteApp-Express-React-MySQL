
import tokenService from "../service/tokenService.js";
import userService from "../service/userService.js";

const THREE_DAYS = 1000 * 60 * 60 * 24 * 3;

export default {
    login: async (req, res) => {
        const { username, password } = req.body || {
            username : '',
            password : ''
        };

        if (!username || !password) {
            return res.status(400).json({
                message: 'Thiếu username hoặc password'
            });
        }

        const result = await userService.login(username, password);
        const { isOk, message, data = null } = result;

        if (!isOk) {
            return res.status(401).json({
                message: message
            })
        }

        const { accessToken, refreshToken, user } = data;

        res.cookie('refreshToken', refreshToken, {
            maxAge: THREE_DAYS,
            httpOnly: true,
            sameSite: 'strict'
        })

        res.json({
            accessToken: accessToken,
            user: user,
            message: message
        });
    },

    register: async (req, res) => {
        const { username, password, email } = req.body || {
            username : '',
            password : '',
            email : ''
        };

        if (!username || !password || !email) {
            return res.status(400).json({
                message: 'Thiếu username, password hoặc email'
            });
        }

        const result = await userService.register(username, password, email);
        const { isOk, message } = result;

        if (!isOk) {
            return res.status(400).json({
                message: message
            })
        }

        return res.status(201).json({
            message: message
        })
    },

    refresh: async (req, res) => {

        const refreshToken = req.cookies?.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({
                message: 'Không có refresh token'
            });
        }

        const isTokenChanged = await tokenService.refresh(refreshToken);
        const { isOk, message, data } = isTokenChanged;
        if (!isOk)
            return res.status(401).json({
                message
            })

        const { newRefreshToken, newAccessToken } = data

        res.cookie('refreshToken', newRefreshToken, {
            maxAge: THREE_DAYS,
            httpOnly: true,
            sameSite: 'strict'
        })

        return res.status(200).json({
            accessToken: newAccessToken
        })
    },

    logout: async (req, res) => {
        const userId = req.userId || '';
        const refreshToken = req.cookies?.refreshToken;

        if (!refreshToken) {
            return res.status(400).json({
                message: 'Không có refresh token'
            });
        }

        const result = await tokenService.deleteToken(userId, refreshToken);

        const { isOk, message } = result;

        if (!isOk) {
            return res.status(400).json({
                message
            })
        }

        res.clearCookie('refreshToken');

        return res.status(200).json({
            message: 'Đăng xuất thành công'
        });

    }
}