import React from 'react'

import './Type.scss'

export default function Type({ handleShowTrashList, isDeleted }) {

  return (
    <ul className='type-container'>
      <li
        className={`${!isDeleted ? "selected" : ''}`}
        onClick={isDeleted ? () => handleShowTrashList(false) : () => {}}
      >
        Tất cả
      </li>
      <li 
        className={`${isDeleted ? "selected" : ''}`}
        onClick={!isDeleted ? () => handleShowTrashList(true) : () => {}}
      >
        Thùng rác
      </li>
    </ul>
  )
}
