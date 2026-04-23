import React from 'react'

import './EmptyNote.scss'

export default function EmptyNote() {
    return (
        <div className="note-empty">
            <div className="note-empty__icon">🗒️</div>
            <h2>Chưa có gì ở đây cả</h2>
            <span>Hãy tạo ghi chú mới để bắt đầu</span>
        </div>
    );
}
