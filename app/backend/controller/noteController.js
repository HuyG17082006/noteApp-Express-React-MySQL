import noteService from "../service/noteService.js";

export default {
    getAll : async (req, res) => {
        const userId = req.userId;
        const options = req.query;

        const result = await noteService.getAll(userId, options);
        const { isOk, message, data } = result;

        if (!isOk) {
            return res.status(400).json({ message })
        }

        return res.status(200).json({
            message,
            data
        })
    },

    addNote : async (req, res) => {
        const userId = req.userId;
        const note = req.body || {
            title : '...',
            description : '',
        };

        const result = await noteService.addNote(userId, note);
        const { isOk, message } = result;

        if (!isOk) {
            return res.status(400).json({ message });
        }

        return res.status(201).json({ message })
    },

    deleteNote : async (req, res) => {
        const userId = req.userId;
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                message : "Lỗi không tìm thấy ghi chú"
            })
        }

        const result = await noteService.deleteNote(userId, id);
        const { isOk, message } = result;

        if (!isOk) {
            return res.status(400).json({ message });
        }

        return res.status(200).json({ message })
    },

    restoreNote : async (req, res) => {
        const userId = req.userId;
        const { id } = req.params;
        
        if (!id) {
            return res.status(400).json({
                message : "Lỗi không tìm thấy ghi chú"
            })
        }

        const result = await noteService.restoreNote(userId, id);
        const { isOk, message } = result;

        if (!isOk) {
            return res.status(400).json({ message });
        }

        return res.status(200).json({ message })
    },

    checkNote : async (req, res) => {
        const userId = req.userId;
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                message : "Lỗi không tìm thấy ghi chú"
            })
        }

        const result = await noteService.checkNote(userId, id);
        const { isOk, message, data } = result;

        if (!isOk) {
            return res.status(400).json({ message })
        }

        return res.status(200).json({
            message,
            data
        })
    },

    updateNote : async (req, res) => {
        const userId = req.userId;
        const { id } = req.params;
        const note = req.body || {
            title : '',
            description : ''
        };

        const result = await noteService.updateNote(userId, id, note);
        const { isOk, message } = result;

        if (!isOk) {
            return res.status(400).json({ message })
        }

        return res.status(200).json({
            message
        })
    }
}