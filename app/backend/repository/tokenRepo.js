import database from "../database/database.js"

export default {
    createToken : async ({ id, userId, refreshToken }) => {
        const [result] = await database.promise().execute('INSERT INTO tokens(id, userId, refreshToken, expired_at) VALUES (?,?,?, NOW() + INTERVAL 3 DAY)', [id, userId, refreshToken]);

        return result.affectedRows > 0;
    },

    deleteToken : async (refreshToken, userId) => {
        const [result] = await database.promise().execute('DELETE FROM tokens WHERE refreshToken = ? AND userId = ? LIMIT 1', [refreshToken, userId])
        return result.affectedRows > 0;
    },

    // findTokenByUserId : async (userId) => {
    //     const [result] = await database.promise().execute('SELECT id, refreshToken FROM tokens WHERE userId = ? LIMIT 1', [userId])
    
    //     if (result.length > 0)
    //         return result[0];
    //     return null;
    // },

    checkRefreshToken : async (refreshToken) => {
        const [result] = await database.promise().execute('SELECT 1 FROM tokens WHERE refreshToken = ? AND expired_at > NOW() LIMIT 1', [refreshToken])
    
        if (result.length > 0)
            return result[0];
        return null;
    }
}