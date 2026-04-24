import noteService from "../service/noteService.js";

import sendRespone from "../utils/sendRespone.js";

export default {
    getAll: async (req, res) => {
        const userId = req.userId;
        const options = req.query;
        console.time('query')
        const result = await noteService.getAll(userId, options);
        console.timeEnd('query')
        return sendRespone(res, {
            resStatus : result.isOk ? 200 : 400,
            ...result
        })
    },

    getAllDeletedNotes : async (req, res) => {
        const userId = req.userId;
        const options = req.query;

        const result = await noteService.getDeletedNotes(userId, options);

        return sendRespone(res, {
            resStatus : result.isOk ? 200 : 400,
            ...result
        })
    },

    addNote: async (req, res) => {
        const userId = req.userId;
        const { title = '', description = '', isPinned = false } = req.body || {}

        const result = await noteService.addNote(
            userId,
            {
                title,
                description,
                isPinned
            }
        );

        return sendRespone(res, {
            resStatus : result.isOk ? 201 : 400,
            ...result
        })
    },

    moveNoteToTrash: async (req, res) => {
        const userId = req.userId;
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                message: "Lỗi không tìm thấy ghi chú"
            })
        }

        const result = await noteService.moveNoteToTrash(userId, id);

        return sendRespone(res, {
            resStatus : result.isOk ? 200 : 400,
            ...result
        })
    },
    
    hardDelete : async (req, res) => {
        const userId = req.userId;
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                message: "Lỗi không tìm thấy ghi chú"
            })
        }

        const result = await noteService.hardDelete(userId, id);

        return sendRespone(res, {
            resStatus : result.isOk ? 200 : 400,
            ...result
        })
    },

    restoreNote: async (req, res) => {
        const userId = req.userId;
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                message: "Lỗi không tìm thấy ghi chú"
            })
        }

        const result = await noteService.restoreNote(userId, id);
        
        return sendRespone(res, {
            resStatus : result.isOk ? 200 : 400,
            ...result
        })
    },

    checkNote: async (req, res) => {
        const userId = req.userId;
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                message: "Lỗi không tìm thấy ghi chú"
            })
        }

        const result = await noteService.checkNote(userId, id);
        
        return sendRespone(res, {
            resStatus : result.isOk ? 200 : 400,
            ...result
        })
    },

    updateNote: async (req, res) => {
        const userId = req.userId;
        const { id } = req.params;

        const result = await noteService.updateNote(
            userId,
            id,
            req.body
        );

        return sendRespone(res, {
            resStatus : result.isOk ? 200 : 400,
            ...result
        })
    },

    togglePinned : async (req, res) => {
        const userId = req.userId;
        const { id } = req.params;
        const { isPinned } = req.body;

        const result = await noteService.updateNote(
            userId,
            id,
            isPinned
        );

        const { isOk, message, data } = result;

        return sendRespone(res, {
            resStatus : result.isOk ? 200 : 400,
            ...result
        })
    },


    hardDeleteAll : async (req, res) => {
        const userId = req.userId;

        const result = await noteService.hardDeleteAll(userId);

        const { isOk, message } = result;

        return sendRespone(res, {
            resStatus : result.isOk ? 200 : 400,
            message : result.message
        })
    }
}