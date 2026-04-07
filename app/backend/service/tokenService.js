import tokenRepo from "../repository/tokenRepo.js";
import jwt from "../utils/jwt.js";

export default {
    createToken : async (userId, refreshToken) => {
        const newToken = {
            id : crypto.randomUUID(),
            userId,
            refreshToken
        }

        const isCreatedToken = await tokenRepo.createToken(newToken);
        
        if (!isCreatedToken) 
            return {
                isOk : false,
                message :  'Lỗi khi tạo token mới'
            }

        return {
            isOk : true,
        }
    },

    deleteToken : async (userId, refreshToken) => {

        const isDeletedToken = await tokenRepo.deleteToken(refreshToken, userId);
        
        if (!isDeletedToken) 
            return {
                isOk : false,
                message :  'Lỗi khi xóa token'
            }

        return {
            isOk : true,
        }

    },

    checkToken : async (refreshToken) => {
        
        const isTokenExisted = await tokenRepo.checkRefreshToken(refreshToken);

        if (!isTokenExisted) 
            return {
                isOk : false,
                message :  'token không hợp lệ hoặc đã hết hạn'
            }

        return {
            isOk : true,
        }

    },

    refresh : async (refreshToken) => {

        const isTokenValidOnWeb = jwt.verifyRefreshToken(refreshToken);

        let { isOk, message, data } = isTokenValidOnWeb;
        
        if (!isOk)
            return { 
                isOk : false,
                message 
            }

        const { userId } = data;    

        const isDeletedToken = await tokenRepo.deleteToken(refreshToken, userId);
        
        if (!isDeletedToken) 
            return {
                isOk : false,
                message :  'token không hợp lệ hoặc đã hết hạn'
            }    

        const newRefreshToken = jwt.createRefreshToken(userId);
        const newAccessToken = jwt.createAccessToken(userId);

        const isCreatedToken = await tokenRepo.createToken({
            id : crypto.randomUUID(),
            userId,
            refreshToken : newRefreshToken
        });
        
        if (!isCreatedToken) 
            return {
                isOk : false,
                message :  'Lỗi khi tạo token mới'
            }

        return {
            isOk : true,
            data : {
                newRefreshToken, 
                newAccessToken
            } 
        }
    }
}