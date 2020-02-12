import React, { Fragment } from 'react';
import TodoListItem from '../todo-list-item';
import './todo-list.css';
import KanbanBoard from '../kanban-board';

const TodoList = ({ todos, onDeleted, onToggleImportant, onToggleStatus, view }) => {
	
	const elements = todos.map((item) => {
		const { __v, ...itemProps } = item; // убираю служебное поле MongoDB, чтобы оно не попадало в itemProps
		const id = item._id;
		return (
			<li key={id} className="list-group-item">
				<TodoListItem 
					view = {view}
					id = {id}
					{ ...itemProps } 
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