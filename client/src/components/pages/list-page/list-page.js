import React, { useState, useContext, useCallback, useEffect } from 'react';
import { useHttp } from '../../../hooks/http-hook';
import AppHeader from '../../app-header';
import SearchPanel from '../../search-panel';
import TodoList from '../../todo-list';
import ItemStatusFilter from '../../item-status-filter';
import ItemAddForm from '../../item-add-form';
import ViewSwitchPanel from '../../view-switch-panel';
import Loader from './../../loader/index';
import { AuthContext } from '../../../context/auth-context';

import './list-page.css';

export const ListPage = () => {
	const [todoData, setTodoData] = useState([]);
	const [searchText, setSearchText] = useState('');
	const [view, setView] = useState('short');  // short, full, scrum
	const [filterBtn, setFilterBtn] = useState('all');  // active, all, done

	const {loading, request} = useHttp();
	const {token} = useContext(AuthContext);

	const getTaskList = useCallback(async() => {
		try {
			const taskData = await request(`/api/tasks`, 'GET', null, {
				authorization: `Bearer ${token}` 
			})
			if (taskData) {
				setTodoData(taskData);
			}
		} catch (e) {}
	}, [token, request]);

	useEffect(() => {
		getTaskList()
	},[getTaskList]);

	const updateTask = async(taskToEdit) => {
		try {
			const taskData = await request(
				`/api/tasks/edit`, 
				'POST',
				{...taskToEdit}, 
				{authorization: `Bearer ${token}` }
			)
			if (taskData && taskData.message === "Task edited") {
				getTaskList();
			}
		} catch (e) {}
	};

	const delTask = async(id) => {
		try {
			const taskData = await request(
				`/api/tasks/remove`, 
				'POST',
				{id}, 
				{authorization: `Bearer ${token}` }
			)
			if (taskData && taskData.message === "Task deleted") {
				getTaskList();
			}
		} catch (e) {}
	};

	const deleteItem = (id) => {
		delTask(id);
	};

	const addTask = async(label) => {
		try {
			const taskData = await request(
				`/api/tasks/add`, 
				'POST',
				{label, status: 10}, 
				{authorization: `Bearer ${token}` }
			)
			if (taskData) {
				getTaskList();
			}
		} catch (e) {}
		
	};

	const addItem = (labelText) => {
		if (labelText) {
			addTask(labelText)
		}
	};

	const onToggleImportant = (id) => {
		// console.log(toggleTaskProperty(todoData, id, 'important'))
		updateTask(toggleTaskProperty(todoData, id, 'important'));
	};

	const toggleTaskProperty = (arr, id, propName) => {
		const idx = arr.findIndex((el) => el._id===id);
		const oldItem = arr[idx];
		const newItem = {...oldItem, [propName]: !oldItem[propName]};
		return newItem
	};

	const onToggleStatus = (id) => {
		let newStatus; 
		const idx = todoData.findIndex((el) => el._id===id);
		const curStatus = todoData[idx].status;
		if (curStatus===30) {
			newStatus = 10;
		} else {
			newStatus = curStatus + 10;
		};
		
		const newTask = {
			...todoData[idx],
			status: newStatus
			
		}
		
		updateTask(newTask)
	};

	const onSwithFilter = (filterBtn) => {
		setFilterBtn(filterBtn);
	};

	const onSwithcView = (view) => {
		setView(view)
	};

	const onSearchInList = (filterText) => {
		setSearchText(filterText)
	};

	const search = (items, filterText) => {
		if (filterText.length === 0) {
			return items
		};

		return items.filter((item) => {
			return item.label.toUpperCase()
				.indexOf(filterText.toUpperCase()) > -1;
		});
	};

	const filter = (items, filter) => {
		switch(filter) {
			case 'all':
				return items;
			case 'active':
				return items.filter((item) => item.status===20);
			case 'done':
				return items.filter((item) => item.status===30);
			default:
				return items;
		}
	};

	const doneCount = todoData.filter((el) => el.status===30).length;
	const toDoCount = todoData.length - doneCount;
	const visibleItems = filter(
		search(
			todoData, 
			searchText), 
		filterBtn);
	
	if (loading) {
		return <Loader />
	}

	return (
		<div className="container">
			<div className="todo-app">
				<div className="d-flex justify-content-between mb-2">
					<ViewSwitchPanel onSwithcView={onSwithcView} view={view} />
					<AppHeader toDo={toDoCount} done={doneCount} />
				</div>
				<div className="top-panel d-flex  mb-2">
					<SearchPanel onSearchInList={onSearchInList} />
					<ItemStatusFilter onSwithFilter={onSwithFilter} filter={filterBtn} />
				</div>

				<TodoList
					view= {view}
					todos={visibleItems} 
					onDeleted={deleteItem}
					onToggleImportant={onToggleImportant} 
					onToggleStatus={onToggleStatus} 
					/>
				
				<ItemAddForm onItemAdded={addItem} />
			</div>
		</div>	
	);
}