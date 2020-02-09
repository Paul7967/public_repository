import React, { Fragment } from 'react';
import TodoListItem from '../todo-list-item';
import './todo-list.css';
import KanbanBoard from '../kanban-board';

const TodoList = ({ todos, onDeleted, onToggleImportant, onToggleStatus, view }) => {
	
	const elements = todos.map((item) => {
		const { id, ...itemProps } = item;
		return (
			<li key={id} className="list-group-item">
				<TodoListItem 
					view = {view}
					id = {id}
					{ ...itemProps } 
					// onItemSelected = {() = onItemSelected(id)}
					onDeleted = {() => onDeleted(id)} 
					onToggleImportant = {() => onToggleImportant(id)} 
					onToggleStatus={() => onToggleStatus(id)}
				/>
			</li>
		);
	});

	const List = () => (
		<ul className="list-group todo-list">
			{ elements }
		</ul>
	);

	return (
		<Fragment>
			{(view!=='scrum')&&<List />}
			{(view==='scrum')&&<KanbanBoard todos={todos} />}
		</Fragment>
	);
};

export default TodoList;