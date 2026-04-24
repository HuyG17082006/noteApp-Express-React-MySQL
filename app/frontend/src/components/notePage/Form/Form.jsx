import React, { useEffect, useRef, useState, useContext } from 'react';
import './Form.scss';

import { formatDate } from '../../../utils/formatDate.js';

import useNote from '../../../hooks/useNote.jsx'

import star from '../../../assets/icon/star.svg'
import starB from '../../../assets/icon/star-b.svg'


export default function Form({ handleShowForm, mode = 'add', noteDetail = null, setNotes, setUpdatedNote }) {

    const formRef = useRef();
    const inputRef = useRef();

    const {
        addNote,
        handleClickHardDelete,
        handleClickSoftDelete,
        handleRestore,
        handlePinnedNote,
        handleUpdateNote
    } = useNote({ setNotes, setUpdatedNote, handleShowForm });

    const [note, setNote] = useState({
        title: noteDetail?.title || '',
        description: noteDetail?.description || '',
        isPinned: noteDetail?.isPinned || false,
        isDeleted: noteDetail?.isDeleted || false,
    });

    const initialNote = useRef(noteDetail || {
        title: '',
        description: '',
        isPinned: false,
        isDeleted: false
    });

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        const init = initialNote.current;

        if (
            note.title !== init.title ||
            note.description !== init.description
        ) {
            setIsEditing(true);
        } else {
            setIsEditing(false);
        }
    }, [note]);

    useEffect(() => {
        if (noteDetail) {
            setNote({
                title: noteDetail.title,
                description: noteDetail.description,
                isPinned: noteDetail.isPinned
            });

            initialNote.current = noteDetail;
        }
    }, [noteDetail]);


    const noteId = mode === 'edit' ? noteDetail.id : ''

    const handleInput = (e) => {
        setNote(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <div
            className='form-container'
            onClick={handleShowForm}
        >

            <div
                className='form-box'
                ref={formRef}
                onClick={(e) => e.stopPropagation()}
            >

                {
                    mode === 'view' ?
                        <span className='date'>
                            {
                                noteDetail.isDeleted ?
                                    <>
                                        {'Đã xóa: '}
                                        {formatDate(noteDetail.deleted_at)}
                                    </>
                                    :
                                    <>
                                        {noteDetail.updated_at !== noteDetail.created_at ? 'Đã sửa: ' : 'Đã tạo: '}
                                        {formatDate(noteDetail.updated_at)}
                                    </>
}
                        </span>
                        :
                        ''
                }

                {
                    noteDetail.isDeleted ?
                        ''
                        :
                        <img
                            src={note.isPinned ? starB : star}
                            onClick={
                                mode === 'add' ?
                                    () => setNote(prev => ({
                                        ...prev,
                                        isPinned: !prev.isPinned
                                    }))
                                    :
                                    () => handlePinnedNote(noteDetail.id, noteDetail.isPinned)
                            }
                        />
                }



                <div className='desc'>
                    <input
                        ref={inputRef}
                        type="text"
                        name="title"
                        placeholder="Tiêu đề..."
                        value={note.title}
                        onChange={handleInput}
                        disabled={noteDetail.isDeleted}
                    />

                    <textarea
                        name="description"
                        placeholder="Nhập gì đó..."
                        value={note.description}
                        onChange={handleInput}
                        disabled={noteDetail.isDeleted}
                    />
                </div>

                <div className='feature'>
                    {
                        mode === 'add' || isEditing ? (
                            <>
                                <button onClick={isEditing && mode === 'view' ? () => handleUpdateNote(noteDetail.id, note) : () => addNote(note)}>Lưu</button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={
                                        noteDetail.isDeleted ?
                                            () => handleClickHardDelete(noteDetail.id)
                                            :
                                            () => handleClickSoftDelete(noteDetail.id)
                                    }
                                >
                                    {noteDetail.isDeleted ? 'Xóa vĩnh viễn' : 'Chuyển vào thùng rác'}
                                </button>

                            </>
                        )
                    }

                    {
                        noteDetail.isDeleted ?
                            <button onClick={() => handleRestore(noteDetail.id)} >Khôi phục</button>
                            :
                            ''
                    }

                    <button onClick={handleShowForm}>Đóng</button>
                </div>

            </div>
        </div>
    );
}