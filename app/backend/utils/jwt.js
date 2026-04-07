import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

const {
    REFRESH_SECRET_TOKEN,
    ACCESS_SECRET_TOKEN
} = process.env;

export default {
    createRefreshToken: (userId) => {
        const token = jwt.sign({ userId }, REFRESH_SECRET_TOKEN, { expiresIn: '3d' });

        return token;
    },

    createAccessToken: (userId) => {
        const token = jwt.sign({ userId }, ACCESS_SECRET_TOKEN, { expiresIn: '30m' });

        return token;
    },

    verifyRefreshToken: (refreshToken) => {
        let result = null;

        try {
            result = jwt.verify(refreshToken, REFRESH_SECRET_TOKEN);

            return {
                isOk: true,
                message: 'Xác thực thành công',
                data: result
            }

        } catch (e) {
            if (e.name === 'TokenExpiredError')
                return {
                    isOk: false,
                    message: 'Phiên đăng nhập đã hết, vui lòng đăng nhập lại!'
                }

            if (e.name === 'JsonWebTokenError')
                return {
                    isOk: false,
                    message: 'Token sai hoặc không tồn tại!'
                }

            if (e)
                return {
                    isOk: false,
                    message: "Lỗi hệ thống"
                }
        }
    },

    verifyAccessToken: (accessToken) => {

        let result = null;

        try {
            result = jwt.verify(accessToken, ACCESS_SECRET_TOKEN);

            return {
                isOk: true,
                message: 'Xác thực thành công',
                data: result
            }

        } catch (e) {

            console.log('utils/jwt error: ', e);

            if (e.name === 'TokenExpiredError')
                return {
                    isOk: false,
                    message: 'Token đã hết hạn!'
                }

            if (e.name === 'JsonWebTokenError')
                return {
                    isOk: false,
                    message: 'Token sai hoặc không tồn tại!'
                }

            return {
                isOk: false,
                message: "Lỗi hệ thống"
            }
        }
    },
}