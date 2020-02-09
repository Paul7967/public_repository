import React from 'react';
import KanbanColumn from './kanban-column';

const KanbanBoard = ({todos}) => {
	return (
		// <div className="container-fluid pt-3">
			<div className="row flex-row flex-sm-nowrap py-4 justify-content-between">
				<KanbanColumn todos={todos} status={10} columnLabel="Todo" />
				<KanbanColumn todos={todos}	status={20} columnLabel="In process" />
				<KanbanColumn todos={todos}	status={30} columnLabel="Done" />
			</div>
		// </div>
	)
}

export default KanbanBoard;