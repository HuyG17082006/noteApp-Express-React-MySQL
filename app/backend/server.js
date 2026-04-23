import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import database from './database/database.js'

import authRouter from './routes/authRoutes.js'
import noteRouter from './routes/noteRoutes.js'
import authMiddleware from './middleware/authMiddleware.js'

dotenv.config()

const app = express();
const { SERVER_PORT = 3000 } = process.env;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173', 'https://note-app-express-react-my-sql.vercel.app'],
    credentials: true
}));

app.use('/auth', authRouter);
app.use(authMiddleware);
app.use('/notes', noteRouter);

database.getConnection((error, connection) => {
    if (error) {
        console.log('Lỗi kết nối database: ', error);
        process.exit(1);
    } else {
        console.log('Kết nối database thành công');
        app.listen(SERVER_PORT, () => {
            console.log(`Server đang chạy tại cổng ${SERVER_PORT}`)
        })
    }
})