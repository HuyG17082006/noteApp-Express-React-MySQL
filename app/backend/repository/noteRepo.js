import database from "../database/database.js"

export default {
    getAllByUserId: async (userId, options = {}) => {
        const {
            sort = 'updated_at',
            order = 'desc',
            isPinned,
            limit = 10,
            offset = 0
        } = options;

        let query = `
            SELECT id, title, isPinned, created_at, updated_at, updated_at, isDeleted
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
        params.push(String(offset), String(limit + 1))

        console.time('query')

        const [result] = await database.promise().execute(query, params)

        console.timeEnd('query')

        return result;
    },

    getAllDeletedNotesByUserId: async (userId, options = {}) => {
        const {
            order = 'desc',
            limit = 10,
            offset = 0
        } = options;

        let query = `
            SELECT id, title, isPinned, deleted_at, isDeleted
            FROM notes
            WHERE userId = ? AND isDeleted = true
        `

        const params = [userId];

        query += ` ORDER BY deleted_at ${order}`;

        query += ` LIMIT ?, ?`;
        params.push(String(offset), String(limit + 1))

        const [result] = await database.promise().execute(query, params)
        return result;
    },

    getNotesCount: async (userId, options = {}) => {
        const {
            isPinned,
            isDeleted = false,
        } = options;

        let query = `
            SELECT COUNT(*) as total 
            FROM notes 
            WHERE userId = ?
        `

        let params = [userId];

        if (isDeleted) {
            query += ' AND isDeleted = true';
        }
        else {
            query += ' AND isDeleted = false';

            if (isPinned !== undefined && isPinned !== '') {
                query += ' AND isPinned = ?';
                params.push(isPinned);
            }
        }

        const [result] = await database.promise().execute(query, params);

        return result[0].total;
    },

    getNoteDetailByUserIdAndId: async (userId, id) => {
        const [result] = await database.promise().execute(
            `
            SELECT id, title, description, created_at, updated_at, deleted_at, isDeleted 
            FROM notes 
            WHERE userId = ? AND id = ? LIMIT 1
            `,
            [userId, id]
        );

        if (result.length > 0)
            return result[0];
        return null;
    },

    deleteNoteByUserIdAndId: async (userId, id, { hardDelete = false } = {}) => {

        let query = '';
        const params = [userId, id];

        console.log(hardDelete)

        if (!hardDelete) {
            query = `
                UPDATE notes
                SET isDeleted = true, deleted_at = NOW()
                WHERE userId = ? AND id = ? AND isDeleted = false
                LIMIT 1
            `
        }
        else {
            query = `
                DELETE FROM notes
                WHERE userId = ? AND id = ? AND isDeleted = true
                LIMIT 1
            `
        }

        const [result] = await database.promise().execute(query, params);

        console.log(query, params)

        return result.affectedRows > 0;
    },
    
    hardDeleteAllNotesByUserId : async (userId) => {

        const [result] = await database.promise().execute(
            `
            DELETE FROM notes 
            WHERE userId = ? AND isDeleted = true
            `,
            [userId]
        )

        return result.affectedRows > 0;
    },

    restoreByUserIdAndId: async (userId, id) => {
        const [result] = await database.promise().execute(
            `
            UPDATE notes 
            SET isDeleted = false 
            WHERE id = ? AND userId = ? AND isDeleted = true 
            LIMIT 1
            `,
            [id, userId]
        );

        return result.affectedRows > 0;
    },

    createNote: async (userId, { id, title, description, isPinned = false }) => {
        await database.promise().execute(
            `
            INSERT INTO notes(id, userId, title, description, isDeleted, isPinned) 
            VALUES (?,?,?,?,false,?)
            `,
            [id, userId, title, description, isPinned]
        );

        return id || null;
    },

    updateNoteByUserIdAndId: async (userId, id, data) => {

        const fields = [];
        const values = [];

        if (data.title !== undefined) {
            fields.push('title = ?');
            values.push(data.title);
        }

        if (data.description !== undefined) {
            fields.push('description = ?');
            values.push(data.description);
        }

        if (data.isPinned !== undefined) {
            fields.push('isPinned = ?');
            values.push(data.isPinned);
        }

        if (fields.length === 0) return false;

        const query = `
            UPDATE notes 
            SET ${fields.join(', ')} ${(data.title !== undefined || data.description !== undefined) ? ',updated_at = NOW()' : ''} 
            WHERE id = ? AND userId = ? 
            LIMIT 1
        `;

        values.push(id, userId);

        const [result] = await database.promise().execute(query, values);

        return result.affectedRows > 0;
    }
}