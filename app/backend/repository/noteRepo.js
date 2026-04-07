import database from "../database/database.js"

export default {
    getAllByUserId: async (userId, options = {}) => {
        const {
            sort = 'created_at',
            order = 'desc',
            isPinned,
            limit = 10,
            offset = 0
        } = options;

        let query = `
            SELECT id, title, isPinned, created_at, updated_at
            FROM notes
            WHERE userId = ? AND isDeleted = false
        `

        const params = [userId];

        if (isPinned !== undefined) {
            query += ` AND isPinned = ?`;
            params.push(isPinned);
        }

        query += ` ORDER BY ${sort} ${order}`;

        query += ` LIMIT ?, ?`;
        params.push(String(offset), String(limit))

        const [result] = await database.promise().execute(query, params)
        return result;
    },

    getNoteDetailByUserIdAndId: async (userId, id) => {
        const [result] = await database.promise().execute(
            'SELECT id, title, description, created_at, updated_at FROM notes WHERE userId = ? AND id = ? AND isDeleted = false LIMIT 1', 
            [userId, id]
        );

        if (result.length > 0)
            return result[0];
        return null;
    },

    SoftDeleteByUserIdAndId: async (userId, id) => {
        const [result] = await database.promise().execute(
            'UPDATE notes SET isDeleted = true WHERE id = ? AND userId = ? AND isDeleted = false LIMIT 1', 
            [id, userId]
        );

        return result.affectedRows > 0;
    },

    restoreByUserIdAndId: async (userId, id) => {
        const [result] = await database.promise().execute(
            'UPDATE notes SET isDeleted = false WHERE id = ? AND userId = ? AND isDeleted = true LIMIT 1',
            [id, userId]
        );

        return result.affectedRows > 0;
    },

    createNote: async (userId, { id, title, description, isPinned = false}) => {
        await database.promise().execute(
            'INSERT INTO notes(id, userId, title, description, isDeleted, isPinned) VALUES (?,?,?,?,false,?)', 
            [id, userId, title, description, isPinned]
        );

        return id || null;
    },

    updateNoteByUserIdAndId: async (userId, { id, title, description }) => {
        const [result] = await database.promise().execute(
            'UPDATE notes SET title = ?, description = ? WHERE id = ? AND userId = ? LIMIT 1', 
            [title, description, id, userId]
        );

        return result.affectedRows > 0;
    }
}