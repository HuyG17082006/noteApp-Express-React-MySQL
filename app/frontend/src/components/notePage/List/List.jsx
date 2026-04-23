import React, { useEffect, useRef } from 'react'

import Note from '../Note/Note.jsx'
import EmptyNote from '../EmptyNote/EmptyNote.jsx'

import './List.scss'

import eye from '../../../assets/icon/eye-b.svg'
import trash from '../../../assets/icon/trash.svg'
import star from '../../../assets/icon/star.svg'
import starB from '../../../assets/icon/star-b.svg'
import starOff from '../../../assets/icon/star-off.svg'
import recycle from '../../../assets/icon/recycle.svg'

export default function List({ notes, selecteNote, setUpdatedNote }) {
	if (!notes || notes.length === 0)
		return (
			<EmptyNote/>
		)

	return (
		<div className='list-container'>
			{
				notes.map(({ id, updated_at, created_at, deleted_at, title, isPinned, isDeleted }) => (
					<Note
						key={id}
						id={id}
						updated_at={updated_at}
						title={title}
						isPinned={isPinned}
						isDeleted={isDeleted}
						created_at={created_at}
						deleted_at={deleted_at}
						icon={
							{
								eye,
								trash,
								star,
								starB,
								starOff,
								recycle
							}
						}

						selecteNote={selecteNote}
						setUpdatedNote={setUpdatedNote}
					/>
				)
				)
			}

		</div>
	)
}
