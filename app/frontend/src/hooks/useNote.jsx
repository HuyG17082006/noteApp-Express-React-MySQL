import React, { useContext } from 'react'

import { NotiContext } from '../context/notiProvider/NotiProvider.jsx'
import { ConfirmContext } from '../context/confirmProvider/ConfirmProvider.jsx';

import noteService from '../services/noteService.js';

export default function useNote({
    setNotes = () => {},
    setUpdatedNote = () => {},
    handleShowForm = () => {}
}) {

    const { addNoti } = useContext(NotiContext)
    
    const { addConfirm } = useContext(ConfirmContext);

    const addNote = async (note) => {

        const newNote = await noteService.addNote(note);

        const { isOk, message, data } = newNote;

        if (!isOk) {
            addNoti(message, 'error')
            return;
        }

        addNoti(message, 'success')
        setNotes(data)

    }

    const handlemoveNoteToTrash = async (id) => {

        const res = await noteService.moveNoteToTrash(id);

        const { isOk, message } = res;

        if (!isOk) {
            addNoti(message, "error");
            return;
        }

        addNoti(message, "success");
        setUpdatedNote();
        handleShowForm();
    }

    const handleClickSoftDelete = (id) => {
        addConfirm({
            title: 'Đưa vào thùng rác',
            message: 'Ghi chú sẽ được chuyển vào thùng rác. Bạn có muốn tiếp tục?',
            func: () => handlemoveNoteToTrash(id)
        });
    };

    const handleHardDelete = async (id) => {

        const res = await noteService.hardDelete(id);

        const { isOk, message } = res;

        if (!isOk) {
            addNoti(message, "error");
            return;
        }

        addNoti(message, "success");
        setUpdatedNote();
        handleShowForm();
    }

    const handleClickHardDelete = (id) => {
        addConfirm({
            title: 'Xóa vĩnh viễn',
            message: 'Bạn có chắc chắn muốn xóa ghi chú này?',
            func: () => handleHardDelete(id)
        });
    };

    const handleUpdateNote = async (id, data) => {

        const newNote = await noteService.updateNote(id, data);

        const { isOk, message } = newNote;

        if (!isOk) {
            addNoti(message, "error");
            return;
        }

        addNoti("Cập nhật ghi chú thành công", "success");
        setUpdatedNote();
        handleShowForm();

    }

    const handlePinnedNote = async (id, isPinned) => {

        const newNote = await noteService.togglePinnedNote(id, isPinned);

        const { isOk, message, data } = newNote;

        if (!isOk) {
            addNoti(message, "error");
            return;
        }

        addNoti("Đánh dấu ghi chú thành công", "success");
        setUpdatedNote();
        handleShowForm();
    }

    const handleRestore = async (id) => {

        const result = await noteService.restoreNote(id);

        const { isOk, message } = result;

        if (!isOk) {
            addNoti(message, "error");
            return;
        }

        addNoti(message, "success");
        setUpdatedNote();
        handleShowForm();

    }

    const handleHardDeleteAll = async () => {
        const result = await noteService.hardDeleteAll();

        const { isOk, message } = result;

        if (!isOk) {
            addNoti('Thùng rác rỗng', "error");
            return;
        }

        addNoti(message, "success");
        setUpdatedNote();
    }

    const handleHardDeleteAllClick = () => {
        addConfirm({
            title: 'Dọn thùng rác',
            message: 'Bạn có chắc chắn muốn xóa toàn bộ ghi chú trong thùng rác?',
            func: () => handleHardDeleteAll()
        });
    }

    return {
        addNote,
        handlemoveNoteToTrash,
        handleClickHardDelete,
        handleClickSoftDelete,
        handleUpdateNote,
        handlePinnedNote,
        handleRestore,
        handleHardDeleteAllClick
    }
}
