import userRepo from "../repository/userRepo.js"
import bcrypt from "../utils/bcrypt.js";
import tokenService from "./tokenService.js";
import jwt from "../utils/jwt.js";
import createResponse from "../utils/createResponse.js";

export default {
    register: async (username, password, email) => {

        const isUsernameOrEmailExisted = await userRepo.findByUsername(username) || await userRepo.findByEmail(email);

        if (isUsernameOrEmailExisted)
            return createResponse({
                isOk: false,
                message: 'Tên đăng nhập hoặc email đã tồn tại'
            })

        const hashPassword = await bcrypt.hashing(password);

        const isUserCreated = await userRepo.createUser({
            id: crypto.randomUUID(),
            username: username,
            hashPassword: hashPassword,
            email: email
        });

        return createResponse({
            isOk: isUserCreated,
            message: isUserCreated ?
                'Đăng ký thành công'
                :
                'Đăng ký thất bại'
        })

    },

    login: async (username, password) => {

        const user = await userRepo.getUserByUsername(username);

        if (!user)
            return createResponse({
                isOk: false,
                message: 'Sai tên tài khoản hoặc mật khẩu'
            })

        const { id, hashPassword, email } = user;

        const verify = await bcrypt.compare(password, hashPassword);
        if (!verify)
            return createResponse({
                isOk: false,
                message: 'Sai tên tài khoản hoặc mật khẩu'
            })

        const refreshToken = jwt.createRefreshToken(id);
        const accessToken = jwt.createAccessToken(id);

        const isTokenCreated = await tokenService.createToken(id, refreshToken);

        if (!isTokenCreated) {
            return createResponse({
                isOk: false,
                message: "Đăng nhập thất bại"
            });
        }

        return createResponse({
            message: "Đăng nhập thành công",
            data: {
                accessToken,
                refreshToken,
                user: {
                    username: username,
                    email
                }
            }
        });
    }
}