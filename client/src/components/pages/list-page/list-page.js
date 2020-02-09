import React, { Component } from 'react';
import AppHeader from '../../app-header';
import SearchPanel from '../../search-panel';
import TodoList from '../../todo-list';
import ItemStatusFilter from '../../item-status-filter';
import ItemAddForm from '../../item-add-form';
import ViewSwitchPanel from '../../view-switch-panel';

import './list-page.css';

export default class ListPage extends Component {
	state = {
		todoData: [],
		filterText: '',
		view: 'short', // short, full, scrum
		filter: 'all' // active, all, done
	};

	loadData = async (url="./data.json") => {
		try {
		  let headers = {};
		  headers['Content-Type'] = 'application/json';
		  const response = await fetch(url)
		  const data = await response.json();
	
		if (!response.ok) {
		  throw new Error(data.message || 'Что-то пошло не так')
		};
	
		return data;
		} catch (e) {
		  console.log('ошибка', e)
		}	
	}

	setDataFromFile = (todoData) => (
		this.setState({todoData})
	);

	componentDidMount() {
		this.loadData("./data.json")
			.then (this.setDataFromFile);
	}

	deleteItem = (id) => {
		this.setState(({ todoData }) => {
			const idx = todoData.findIndex((el) => el.id===id);
			const newArray = [
				...todoData.slice(0, idx), 
				...todoData.slice(idx+1)];
			
			return {
				todoData: newArray
			};
		});
	};

	addItem = (text) => {
		this.setState(({ todoData }) => {
			const nextId = Math.floor(Math.random()*1000);
			const newItem = {label: text, important: false, id: nextId, status: 10}
			const newArray = [...todoData, newItem];

			return {
				todoData: newArray
			};
		});

	};

	setProperty = (arr, id, propName, propVal) => {
		const idx = arr.findIndex((el) => el.id===id);
		const oldItem = arr[idx];
		const newItem = {...oldItem, [propName]: propVal};
		return [
			...arr.slice(0, idx), 
			newItem,
			...arr.slice(idx+1)];
	};


	toggleProperty = (arr, id, propName) => {
		const idx = arr.findIndex((el) => el.id===id);
		const oldItem = arr[idx];
		const newItem = {...oldItem, [propName]: !oldItem[propName]};
		return [
			...arr.slice(0, idx), 
			newItem,
			...arr.slice(idx+1)];
	};

	onToggleStatus = (id) => {
		const {todoData} = this.state;
		let newStatus; 
		const idx = todoData.findIndex((el) => el.id===id);
		const curStatus = todoData[idx].status;
		if (curStatus===30) {
			newStatus = 10;
		} else {
			newStatus = curStatus + 10;
		};

		this.setState(( {todoData} ) => {
			return {
				todoData: this.setProperty(todoData, id, 'status', newStatus)
			};

		});
	};

	onToggleImportant = (id) => {
		this.setState(( {todoData} ) => {
			return {
				todoData: this.toggleProperty(todoData, id, 'important')
			};
		});
	};

	onFilterList = (filterText) => {
		this.setState( {filterText} );
	};

	onSwithFilter = (filter) => {
		this.setState( {filter} );
	};

	onSwithcView = (view) => {
		this.setState( {view} );
	};

	search(items, filterText) {
		if (filterText.length === 0) {
			return items
		};

		return items.filter((item) => {
			return item.label.toUpperCase()
				.indexOf(filterText.toUpperCase()) > -1;
		});
	};

	filter(items, filter) {
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

	render() {
		const { todoData, filterText, filter, view } = this.state;
		const doneCount = todoData.filter((el) => el.status===30).length;
		const doDoCount = todoData.length - doneCount;

		const visibleItems = this.filter(
			this.search(todoData, filterText), filter);

		return (
			<div className="container">
				<div className="todo-app">
					
					<div className="d-flex justify-content-between mb-2">
						<ViewSwitchPanel onSwithcView={this.onSwithcView} view={view} />
						<AppHeader toDo={doDoCount} done={doneCount} />
					</div>
					<div className="top-panel d-flex  mb-2">
						<SearchPanel onFilterList={this.onFilterList} />
						<ItemStatusFilter onSwithFilter={this.onSwithFilter} filter={filter} />
					</div>

					<TodoList
						view= {view}
						todos={visibleItems} 
						onDeleted={this.deleteItem}
						onToggleImportant={this.onToggleImportant} 
						onToggleStatus={this.onToggleStatus} />
					
					<ItemAddForm onItemAdded={this.addItem} />
				</div>
			</div>	
		);
	};
};