import userRepo from "../repository/userRepo.js"
import bcrypt from "../utils/bcrypt.js";
import tokenService from "./tokenService.js";
import jwt from "../utils/jwt.js";

export default {
    register : async (username, password, email) => {

        const usernameIsExisted = await userRepo.findByUsername(username); 
        if (usernameIsExisted)
            return {
                isOk : false,
                message : 'Tên đăng nhập hoặc email đã tồn tại!'
            }

        const emailIsExisted = await userRepo.findByEmail(email);
        if (emailIsExisted)
            return {
                isOk : false,
                message : 'Tên đăng nhập hoặc email đã tồn tại!'
            }

        const hashPassword = await bcrypt.hashing(password);

        const isUserCreated = await userRepo.createUser({
            id : crypto.randomUUID(),
            username : username,
            hashPassword : hashPassword,
            email : email
        });

        if (!isUserCreated)
            return {
                isOk : false,
                message : "Đăng kí thất bại"
            }

        return {
            isOk : true,
            message : "Tạo tài khoản thành công!"
        }
    },
    
    login : async (username, password) => {

        const user = await userRepo.getUserByUsername(username);

        if (!user)
            return {
                isOk : false,
                message : 'Sai tên tài khoản hoặc mật khẩu'
            }

        const { id, hashPassword, email } = user;
        const verify = await bcrypt.compare(password, hashPassword);
        if (!verify)
            return {
                isOk : false,
                message : 'Sai tên tài khoản hoặc mật khẩu'
            }
        
        const refreshToken = jwt.createRefreshToken(id);
        const accessToken = jwt.createAccessToken(id);

        const isTokenCreated = await tokenService.createToken(id, refreshToken);
        const { isOk, message : tokenMessage } = isTokenCreated;
        
        if (!isOk)
            return {
                isOk,
                tokenMessage
            }

        return {
            isOk : true,
            message : 'Đăng nhập thành công',
            data : {
                accessToken,
                refreshToken,
                user : {
                    username : user.username,
                    email
                }
            }
        }
    }
}