import React from 'react';
import './todo-list-item.sass';
import {useHistory} from 'react-router-dom'

const TodoListItem = ({ label, onDeleted, onToggleImportant, 
	onToggleStatus, important, status, view, description, deadline_date, id, 
	onItemSelected }) => {
	const history = useHistory()
		
		let classNames = 'todo-list-item';
		let statusBtnClassNames = 'btn btn-sm float-left';
		let statusBtnIClassNames = 'fa fa-';
		switch (status) {
			case 10:
				classNames += ' text-dark todo-list-item-label-status-todo';
				statusBtnClassNames += ' btn-outline-secondary';
				statusBtnIClassNames += 'square';
				break
			case 20:
				classNames += ' text-success todo-list-item-label-status-inprocess';
				statusBtnClassNames += ' btn-outline-success';
				statusBtnIClassNames += 'angle-double-right';
				break
			case 30:
				classNames += ' text-muted todo-list-item-label-status-done';
				statusBtnClassNames += ' btn-outline-success';
				statusBtnIClassNames += 'check-square';
				break
			default: 
				classNames += ' text-dark todo-list-item-label-status-todo';
				statusBtnClassNames += ' btn-outline-secondary';
				statusBtnIClassNames += 'square';
		}

		if (important) {
			classNames += ' todo-list-item-label-important';
		};
		
		const TaskDescription = () => (
			<div className="task-descr">
				<div className="task-descr_text" >{description}</div>
				<div>{deadline_date}</div>
			</div>
		);

		return (
			<div>
				<div className={classNames}>
					<button type="button" className={statusBtnClassNames}
							onClick={ onToggleStatus }> 
						<i className={statusBtnIClassNames} />
					</button>

					<div className="todo-list-item-label" 
						onClick={() => {
							history.push(`/tasklist/${id}`);
						}} 
						>
						{label}
					</div>

					<div>
						<button type="button" className="btn btn-outline-success btn-sm float-right"
								onClick={onToggleImportant}>
							<i className="fa fa-exclamation" />
						</button>
				
						<button type="button" className="btn btn-outline-danger btn-sm float-right"
								onClick={onDeleted} >
							<i className="fa fa-trash-o" />
						</button>
					</div>

					
				</div>
				{(view==='full')&&<TaskDescription />}
			</div>
		);
	// };

};


export default TodoListItem;