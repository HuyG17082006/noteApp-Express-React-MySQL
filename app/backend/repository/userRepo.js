
import database from "../database/database.js";

export default {
    findByUsername : async (username) => {
        const [result] = await database.promise().execute('SELECT 1 FROM users WHERE username = ? LIMIT 1', [username]);

        return result.length > 0;
    },

    findByEmail : async (email) => {
        const [result] = await database.promise().execute('SELECT 1 FROM users WHERE email = ? LIMIT 1', [email]);

        return result.length > 0;
    },

    getUserByUsername : async (username) => {
        const [result] = await database.promise().execute('SELECT id, hashPassword FROM users WHERE username = ? LIMIT 1', [username]);

        if (result.length > 0)
            return result[0];
        return null;
    },

    getUserById : async (id) => {
        const [result] = await database.promise().execute('SELECT username, hashPassword FROM users WHERE id = ? LIMIT 1', [id]);

        if (result.length > 0)
            return result[0];
        return null;
    },

    createUser : async ({ id, username, hashPassword, email }) => {
        const [result] = await database.promise().execute('INSERT INTO users(id, username, hashPassword, email) VALUES(?,?,?,?)', [id, username, hashPassword, email]);
    
        return result.affectedRows > 0;
    }
}