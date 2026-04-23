import React from 'react'

import './Pagination.scss'

export default function Pagination({ page, paginationCondition, handlePageChange }) {

	const { hasNext, hasPrev, totalPage } = paginationCondition;

	const leftButtonNumber = page === 1 ? 1 : (
		page === totalPage && totalPage > 2 ?
			totalPage - 2 : page - 1
	);

	const middleButtonNumber = page <= 2 ? 2 : (
		page === totalPage ?
			totalPage - 1 : page
	);

	const rightButtonNumber = page === totalPage ? totalPage : (
		page === 1 ? page + 2 : page + 1)


	console.log("pagination state: ", hasNext, hasPrev, totalPage)

	const handlePage = (e, pageNumber) => {
		if (e.target.tagName === 'BUTTON')
			handlePageChange(pageNumber)
	}

	return (
		<div className='pagi-container'>
			<button
				disabled={!hasPrev}
				onClick={(e) => handlePage(e, page - 1)}
			>
				{"<"}
			</button>

			<button
				key={`page-${leftButtonNumber}`} 
				className={`${leftButtonNumber === page ? 'selected' : ''}`}
				onClick={(e) => handlePage(e, leftButtonNumber)}
			>
				{leftButtonNumber}
			</button>

			{
				totalPage < 2 ?
					''
					:
					<button 
						key={`page-${middleButtonNumber}`}
						className={`${middleButtonNumber === page ? 'selected' : ''}`}
						onClick={(e) => handlePage(e, middleButtonNumber)}	
					>
						{middleButtonNumber}
					</button>
			}

			{
				totalPage < 3 ?
					''
					:
					<button 
						key={`page-${rightButtonNumber}`}
						className={`${rightButtonNumber === page ? 'selected' : ''}`}
						onClick={(e) => handlePage(e, rightButtonNumber)}	
					>
						{rightButtonNumber}
					</button>
			}


			<button 
				disabled={!hasNext}
				onClick={(e) => handlePage(e, page + 1)}
			>
				{">"}
			</button>
		</div>
	)
}
