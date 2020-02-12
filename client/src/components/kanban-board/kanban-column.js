import React from 'react';
import KanbanCard from './kanban-card';

const KanbanColumn = ({todos, status, columnLabel}) => {
	
	let a = todos.filter((item) => {return item.status===status});
	let cards = a.map((item)=>{
		return <KanbanCard key={item._id} {...item} /> 
	})

	return (
		<div className="col-sm-6 col-md-4 col-xl-4">
			<div className="card bg-light">
				<div className="card-body p-2">
					<h6 className="card-title text-uppercase text-truncate py-2">{columnLabel} </h6>
					<div className="items border border-light">
						{cards}
					</div>										
				</div>
			</div>
		</div>	
	)
}

export default KanbanColumn;
	