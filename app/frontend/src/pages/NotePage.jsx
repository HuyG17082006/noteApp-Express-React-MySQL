import React, { useRef } from 'react'
import { useState, useEffect, useContext, useMemo } from 'react'
import { useSearchParams } from 'react-router'

import { NotiContext } from '../context/notiProvider/NotiProvider.jsx'

import { DEFAULT_URL_PARAMS, FIRST_PAGE } from '../utils/constant.js'

import useAuth from '../hooks/useAuth.jsx'

import noteService from '../services/noteService.js'
import List from '../components/notePage/List/List.jsx'
import Pagination from '../components/notePage/Pagination/Pagination.jsx'
import Tool from '../components/notePage/Tool/Tool.jsx'
import Type from '../components/notePage/Type/Type.jsx'
import Form from '../components/notePage/Form/Form.jsx'

import './NotePage.scss'

export default function NotePage() {

	const [notes, setNotes] = useState([]);

	const [searchParams, setSearchParams] = useSearchParams();

	const [formMode, setFormMode] = useState('add');

	const { addNoti } = useContext(NotiContext);

	const { logout } = useAuth({});

	const hasFetched = useRef(false);

	const [showForm, setShowForm] = useState(false);

	const [noteSeleted, setNoteSelected] = useState({
		id: '',
		title: '',
		description: '',
		isPinned: false,
		updated_at: '',
		deleted_at : ''
	})

	const [paginationCondition, setPaginationCondition] = useState({
		hasNext: false,
		hasPrev: false,
		totalPage: 0
	})

	const params = useMemo(() => ({
		sort: searchParams.get("sort") || DEFAULT_URL_PARAMS.sort,
		order: searchParams.get("order") || DEFAULT_URL_PARAMS.order,
		isPinned: searchParams.get('isPinned') !== null ? searchParams.get('isPinned') : '',
		page: Number(searchParams.get("page") || DEFAULT_URL_PARAMS.page),
		limit: Number(searchParams.get("limit") || DEFAULT_URL_PARAMS.limit),
		isDeleted: searchParams.get("isDeleted") === 'true'
	}), [searchParams]);

	useEffect(() => {

		getList(params);

	}, [searchParams]);

	useEffect(() => {

		if (!searchParams.toString()) {
			setSearchParams(params);
		}

	}, [])

	const getList = async (params) => {

		const { 
			isOk, 
			message, 
			data : list, 
			pagination 
		} = params.isDeleted ? 
				await noteService.getAllDeleted(params) 
				: 
				await noteService.getAll(params);

		if (!isOk) {
			setNotes([]);
			return;
		}

		const {
			limit = params.limit,
			page,
			total
		} = pagination;

		const finalList = list.length > limit ? list.slice(0, -1) : list;

		const hasNext = list.length > limit;
		const hasPrev = page > 1;
		const totalPage = Math.ceil(total / limit) || 1;

		setPaginationCondition({
			hasNext: hasNext,
			hasPrev: hasPrev,
			totalPage: totalPage
		})

		setNotes(finalList)

		hasFetched.current = false;

	}

	const updateParams = (params) => {
		let currenParams = Object.fromEntries(searchParams);

		setSearchParams({
			...currenParams,
			...params
		})
	}

	const handlePageChange = (page) => {
		updateParams({ page })
	}

	const handleSortOptions = (order = 'desc') => {
		updateParams({ order })
	}

	const handlePinnedSort = (isPinned = undefined) => {
		updateParams({
			isPinned,
			page: FIRST_PAGE
		})
	}

	const handleShowTrashList = (isDeleted = false) => {
		updateParams({
			isDeleted,
			page: FIRST_PAGE
		})
	}

	const handleShowForm = (mode) => {
		handleFromChange(mode)

		if (mode === 'add')
			setNoteSelected({
				title: '',
				description: '',
				isPinned: false
			});

		setShowForm(!showForm);
	}

	const handleFromChange = (mode) => {
		setFormMode(mode)
	}

	const handleViewNote = async (id) => {

		handleShowForm('view')

		const noteDetail = await noteService.getDetail(id);

		const { isOk, message, data } = noteDetail;

		if (!isOk) {
			addNoti(message, 'error');
			return;
		}

		setNoteSelected(data);

	}

	const reRenderList = () => {
		getList(params)
	}

	const addNoteInState = (newNote) => {
		if (params.order === 'desc' && (String(newNote.isPinned) === params.isPinned || params.isPinned === ''))
			setNotes(prev => [newNote, ...prev])
		setShowForm(false)
	}

	return (
		<div className='note-container'>

			<div className='side-bar'>

				<Type
					handleShowTrashList={handleShowTrashList}
					isDeleted={params.isDeleted}
				/>

				<button onClick={() => logout()}>Đăng xuất</button>

			</div>

			<div className='side-content'>

				<Tool
					handleSortOptions={handleSortOptions}
					handlePinnedSort={handlePinnedSort}
					isPinned={params.isPinned}
					isDeleted={params.isDeleted}
					order={params.order}
					handleShowForm={handleShowForm}
					handleFromChange={handleFromChange}
					setUpdatedNote={reRenderList}
				/>

				<List
					notes={notes}
					selecteNote={handleViewNote}
					setUpdatedNote={reRenderList}
				/>

				<Pagination
					handlePageChange={handlePageChange}
					page={params.page}
					paginationCondition={paginationCondition}
				/>

			</div>

			{
				showForm ?
					<Form
						showForm={showForm}
						handleShowForm={handleShowForm}
						setNotes={addNoteInState}
						noteDetail={noteSeleted}
						mode={formMode}
						setUpdatedNote={reRenderList}
					/>
					:
					''
			}

		</div>
	)

}
