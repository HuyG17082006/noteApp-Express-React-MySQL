import jwt from '../utils/jwt.js'

export default function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader ? authHeader.split(' ')[1] : null;

    console.time('middleWare')

    if (!token) {
        return res.status(401).json({
            message : "Không có token"
        })
    }

    const verify = jwt.verifyAccessToken(token);

    const { isOk, message, data } = verify;

    if (!isOk) {
        return res.status(401).json({
            message,
            isAccessTokenExpired : true
        })
    }

    console.timeEnd('middleWare')

    req.userId = data.userId;

    next();
}