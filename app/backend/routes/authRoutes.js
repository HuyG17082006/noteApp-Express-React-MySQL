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

authRouter.post('/login', login);
authRouter.post('/register', register);
authRouter.post('/refresh', refresh);
authRouter.post('/logout', authMiddleware, logout);

export default authRouter;

