import noteRepo from "../repository/noteRepo.js";

import createResponse from "../utils/createResponse.js";

export default {
    addNote: async (userId, note) => {

        const id = crypto.randomUUID();
        const newNote = {
            id,
            ...note
        }

        const isNoteCreated = await noteRepo.createNote(userId, newNote);

        if (!isNoteCreated) {
            return createResponse({
                isOk: false,
                message: 'Tạo ghi chú không thành công'
            });
        }

        return createResponse({
            isOk: true,
            message: 'Tạo ghi chú thành công',
            data: {
                ...newNote,
                updated_at: Date.now(),
                created_at: Date.now()
            }
        })
    },

    moveNoteToTrash: async (userId, id) => {
        const isMoved = await noteRepo.deleteNoteByUserIdAndId(userId, id);

        if (!isMoved) {
            return createResponse({
                isOk: false,
                message: 'Không thể chuyển ghi chú vào thùng rác'
            });
        }

        return createResponse({
            isOk: true,
            message: 'Đã chuyển ghi chú vào thùng rác'
        });
    },

    hardDelete: async (userId, id) => {
        const isDeleted = await noteRepo.deleteNoteByUserIdAndId(userId, id, { hardDelete: true });

        if (!isDeleted) {
            return createResponse({
                isOk: false,
                message: 'Không thể xóa ghi chú này'
            });
        }

        return createResponse({
            isOk: true,
            message: 'Đã xóa ghi chú thành công'
        });
    },

    restoreNote: async (userId, id) => {

        const isRestored = await noteRepo.restoreByUserIdAndId(userId, id);

        if (!isRestored) {
            return createResponse({
                isOk: false,
                message: 'Khôi phục ghi chú không thành công'
            });
        }

        return createResponse({
            isOk: true,
            message: 'Khôi phục ghi chú thành công'
        });
    },

    checkNote: async (userId, id) => {
        const noteDetail = await noteRepo.getNoteDetailByUserIdAndId(userId, id);

        if (!noteDetail) {
            return createResponse({
                isOk: false,
                message: 'Lỗi khi lấy thông tin ghi chú'
            });
        }

        return createResponse({
            isOk: true,
            message: 'Lấy thông tin ghi chú thành công',
            data: noteDetail
        });
    },

    getAll: async (userId, options = {}) => {

        let {
            sort = 'updated_at',
            order = 'desc',
            isPinned,
            page = 1,
            limit = 10
        } = options;

        const validSortFields = ['updated_at', 'title', 'isPinned'];
        const validOrder = ['asc', 'desc'];

        sort = validSortFields.includes(sort) ? sort : 'updated_at';
        order = validOrder.includes(order) ? order : 'desc';

        if (isPinned === 'true') isPinned = true;
        else if (isPinned === 'false') isPinned = false;
        else isPinned = undefined;

        const pageNum = parseInt(page) || 1;
        const limitNum = parseInt(limit) || 10;
        const offset = (pageNum - 1) * limitNum;
        console.time('getAll')
        const notes = await noteRepo.getAllByUserId(userId, {
            sort,
            order,
            isPinned,
            limit: limitNum,
            offset
        });
        console.timeEnd('getAll')
        console.time('getCount')
        const total = await noteRepo.getNotesCount(userId, {
            isPinned
        })
        console.timeEnd('getCount')
        return createResponse({
            isOk: true,
            message: 'Lấy danh sách ghi chú thành công',
            data: notes,
            pagination: {
                page: pageNum,
                limit: limitNum,
                total
            }
        });
    },

    getDeletedNotes: async (userId, options = {}) => {

        let {
            order = 'desc',
            page = 1,
            limit = 10
        } = options;

        const validSortFields = ['title', 'isPinned'];
        const validOrder = ['asc', 'desc'];

        order = validOrder.includes(order) ? order : 'desc';

        const pageNum = parseInt(page) || 1;
        const limitNum = parseInt(limit) || 10;
        const offset = (pageNum - 1) * limitNum;

        const deletedNotes = await noteRepo.getAllDeletedNotesByUserId(userId, {
            order,
            limit: limitNum,
            offset
        });

        const total = await noteRepo.getNotesCount(userId, {
            isDeleted: true
        })

        return createResponse({
            isOk: true,
            message: 'Lấy danh sách ghi chú thành công',
            data: deletedNotes,
            pagination: {
                page: pageNum,
                limit: limitNum,
                total
            }
        });
    },

    updateNote: async (userId, id, data) => {
        const isUpdated = await noteRepo.updateNoteByUserIdAndId(userId, id, data);

        if (!isUpdated) {
            return createResponse({
                isOk: false,
                message: 'Cập nhật ghi chú thất bại'
            });
        }

        return createResponse({
            message: 'Cập nhật ghi chú thành công',
            data: {
                id,
                ...data,
                updated_at: Date.now()
            }
        });
    },

    hardDeleteAll : async (userId) => {

        const isDeleted = await noteRepo.hardDeleteAllNotesByUserId(userId);

        if (!isDeleted)
            return createResponse({
                isOk: false,
                message: 'Dọn thùng rác thất bại'
            });
        
        return createResponse({
            message: 'Đã dọn sạch thùng rác',
        });
    }
}