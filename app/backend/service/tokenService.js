import tokenRepo from "../repository/tokenRepo.js";
import jwt from "../utils/jwt.js";

import createResponse from "../utils/createResponse.js";

export default {
    createToken: async (userId, refreshToken) => {
        const newToken = {
            id: crypto.randomUUID(),
            userId,
            refreshToken
        }

        const isCreatedToken = await tokenRepo.createToken(newToken);

        return createResponse({
            isOk: isCreatedToken,
            message: isCreatedToken ?
                'Tạo token mới thành công'
                :
                'Lỗi khi tạo token mới'
        })
    },

    deleteToken: async (userId, refreshToken) => {

        const isDeletedToken = await tokenRepo.deleteToken(refreshToken, userId);

        return createResponse({
            isOk: isDeletedToken,
            message: isDeletedToken ?
                'Xóa token thành công'
                :
                'Lỗi khi xóa token'
        })

    },

    checkToken: async (refreshToken) => {

        const isTokenExisted = await tokenRepo.checkRefreshToken(refreshToken);

        return createResponse({
            isOk: isTokenExisted,
            message: isTokenExisted ?
                'Token không hợp lệ hoặc đã hết hạn'
                :
                'dữ liệu hợp lệ'
        })

    },

    refresh: async (refreshToken) => {

        const isTokenValidOnWeb = jwt.verifyRefreshToken(refreshToken);

        if (!isTokenValidOnWeb.isOk)
            return createResponse(isTokenValidOnWeb);

        const { userId } = isTokenValidOnWeb.data;

        const isDeletedToken = await tokenRepo.deleteToken(refreshToken, userId);

        if (!isDeletedToken)
            return createResponse({
                isOk: isDeletedToken,
                message: 'token không hợp lệ hoặc đã hết hạn'
            })

        const newRefreshToken = jwt.createRefreshToken(userId);
        const newAccessToken = jwt.createAccessToken(userId);


        const isRefreshSuccess = await tokenRepo.createToken({
            id: crypto.randomUUID(),
            userId,
            refreshToken: newRefreshToken
        });

        return createResponse({
            isOk: isRefreshSuccess,
            message: isRefreshSuccess ?
                'Refresh token thành công'
                :
                'Lỗi khi refresh token',
            data: isRefreshSuccess ?
                {
                    newRefreshToken,
                    newAccessToken
                } 
                :
                null
        })
    }
}