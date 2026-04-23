import React, { useEffect, useState, useContext } from 'react'
import useLockAction from '../../../hooks/useLockAction.jsx';

import { formatDate } from '../../../utils/formatDate.js';

import useNote from '../../../hooks/useNote.jsx';

import './Note.scss'

export default function Note({ id, title, updated_at, created_at, deleted_at, isPinned, isDeleted, icon, selecteNote, setUpdatedNote }) {

	const { eye, star, starB, trash, starOff, recycle } = icon;

	const {
		addNote,
		handleClickHardDelete,
		handleClickSoftDelete,
		handleRestore,
		handlePinnedNote
	} = useNote({ setUpdatedNote });

	const { runFunc, isLocked } = useLockAction(() => handlePinnedNote(id, isPinned), 500);

	const handleClickPinned = async (runFunc, isLocked) => {

		if (isLocked) {
			addNoti('Bạn đang thao tác quá nhanh!', 'warning', 2000);
			return;
		}

		runFunc()
	}

	return (
		<div className='note'>

			{
				isPinned && !isDeleted ?
					<img src={starB} className='pin' />
					:
					''
			}


			<h2>{title || 'Chưa có tiêu đề...'}</h2>
			<span> 
				{
					isDeleted ?
						<>
							{'Đã xóa: '}
							{formatDate(deleted_at)}
						</>
						:
						<>
							{updated_at !== created_at ? 'Đã sửa: ' : 'Đã tạo: '}
							{formatDate(updated_at)}
						</>
				}
			</span>

			<div className='feature'>
				<img src={eye} title="Xem chi tiết" onClick={() => selecteNote(id)} />

				{
					isDeleted ?
						<img
							src={recycle}
							title="Khôi phục ghi chú"
							onClick={() => handleRestore(id)}
						/>
						: (
							isPinned ?
								<img
									src={starOff}
									title="Bỏ đánh dấu"
									onClick={() => handleClickPinned(runFunc, isLocked)}
								/>
								:
								<img
									src={star}
									title="Đánh dấu"
									onClick={() => handleClickPinned(runFunc, isLocked)}
								/>
						)
				}


				<img
					src={trash}
					title={isDeleted ? "Xóa hoàn toàn" : "Chuyển vào thùng rác"}
					onClick={
						isDeleted ?
							() => handleClickHardDelete(id)
							:
							() => handleClickSoftDelete(id)
					}
				/>
			</div>

		</div>
	)
}
