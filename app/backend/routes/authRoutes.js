import authController from "../controller/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import express from 'express';

const authRouter = express.Router();

const {
    login,
    register,
    refresh,
    logout
} = authController;

console.time('auth')

authRouter.post('/login', login);
authRouter.post('/register', register);
authRouter.post('/refresh', refresh);
authRouter.post('/logout', authMiddleware, logout);

console.timeEnd('notes')

export default authRouter;

