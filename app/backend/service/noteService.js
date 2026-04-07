import noteRepo from "../repository/noteRepo.js";

export default {
    addNote: async (userId, note) => {

        const id = crypto.randomUUID();
        const newNote = {
            id,
            ...note
        }

        const isNoteCreated = await noteRepo.createNote(userId, newNote);

        if (!isNoteCreated) {
            return {
                isOk: false,
                message: 'Tạo ghi chú không thành công'
            }
        }

        return {
            isOk: true,
            message: 'Tạo ghi chú thành công',
        }
    },

    deleteNote: async (userId, id) => {

        const isNoteDeleted = await noteRepo.SoftDeleteByUserIdAndId(userId, id);

        if (!isNoteDeleted) {
            return {
                isOk: false,
                message: 'Xóa ghi chú không thành công'
            }
        }

        return {
            isOk: true,
            message: 'Xóa ghi chú thành công',
        }
    },

    restoreNote: async (userId, id) => {

        const isNoteRestored = await noteRepo.restoreByUserIdAndId(userId, id);

        if (!isNoteRestored) {
            return {
                isOk: false,
                message: 'Lưu trữ lại ghi chú không thành công'
            }
        }

        return {
            isOk: true,
            message: 'Lưu trữ lại ghi chú thành công',
        }
    },

    checkNote: async (userId, id) => {

        const noteDetail = await noteRepo.getNoteDetailByUserIdAndId(userId, id);

        if (!noteDetail) {
            return {
                isOk: false,
                message: 'lỗi khi lấy thông tin của ghi chú'
            }
        }

        return {
            isOk: true,
            message: 'lấy thông tin của ghi chú thành công',
            data: noteDetail
        }

    },

    getAll: async (userId, options = {}) => {

        let { 
            sort = 'createdAt',
            order = 'desc',
            isPinned,
            page = 1,
            limit = 10 
        } = options;

        const validSortFields = ['created_at', 'title', 'isPinned'];
        const validOrder = ['asc', 'desc'];

        sort = validSortFields.includes(sort) ? sort : 'created_at';
        order = validOrder.includes(order) ? order : 'desc';

        if (isPinned === 'true') isPinned = true;
        else if (isPinned === 'false') isPinned = false;
        else isPinned = undefined;

        const pageNum = parseInt(page) || 1;
        const limitNum = parseInt(limit) || 10;
        const offset = (pageNum - 1) * limitNum;

        const notes = await noteRepo.getAllByUserId(userId, {
            sort,
            order,
            isPinned,
            limit: limitNum,
            offset
        });

        return {
            isOk: true,
            message: 'Lấy danh sách ghi chú thành công',
            data: notes,
            pagination: {
                page,
                limit,
                total : notes.length
            }
        };
    },

    updateNote: async (userId, id, { title = '', description = '' }) => {

        const newNote = {
            id,
            title,
            description
        }

        const isNoteUpdated = await noteRepo.updateNoteByUserIdAndId(userId, newNote);

        if (!isNoteUpdated) {
            return {
                isOk: false,
                message: 'cập nhật ghi chú thất bại'
            }
        }

        return {
            isOk: true,
            message: 'cập nhật ghi chú thành công',
        }
    }
}