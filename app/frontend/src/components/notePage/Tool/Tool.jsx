import React from 'react'

import './Tool.scss'

import useNote from '../../../hooks/useNote.jsx'

export default function Tool({ setUpdatedNote, handleSortOptions, handlePinnedSort, isDeleted, isPinned, order, handleShowForm }) {

    const { handleHardDeleteAllClick } = useNote({setUpdatedNote});

    return (
        <div className='tool-container'>

            <div className='sort'>

                <select
                    value={order}
                    onChange={(e) => handleSortOptions(e.target.value)}
                >
                    <option value="desc">Gần đây</option>
                    <option value="asc">Xa nhất</option>
                </select>

                {
                    !isDeleted
                    && 
                    <select
                        value={
                            isPinned === '' ?
                                ''
                                :
                                (isPinned === 'true' ?
                                    true
                                    :
                                    false
                                )
                        }
                        onChange={(e) => handlePinnedSort(e.target.value)}
                    >
                        <option value=''>Mặc định</option>
                        <option value={false}>Không được đánh dấu</option>
                        <option value={true}>Được đánh dấu</option>
                    </select>
                }

            </div>

            <div className='feature'>

                <button
                    onClick={isDeleted ? () => handleHardDeleteAllClick() : () => handleShowForm('add')}

                >
                    {isDeleted ? 'Dọn thùng rác' : 'Thêm ghi chú'}
                </button>

            </div>

        </div>
    )
}
