import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config();

const { 
    DATABASE_USERNAME,
    DATABASE_PASSWORD,
    DATABASE_NAME,
    DATABASE_PORT,
    DATABASE_HOST
} = process.env;

export default mysql.createPool({
    host: DATABASE_HOST,
    user: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    port: Number(DATABASE_PORT),
    connectionLimit: 10,

    ssl : {
        rejectUnauthorized : false
    }
})
