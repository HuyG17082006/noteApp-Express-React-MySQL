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
    database : DATABASE_NAME,
    user : DATABASE_USERNAME,
    password : DATABASE_PASSWORD,
    port : DATABASE_PORT,
    host : DATABASE_HOST,
    connectionLimit : 10
})
