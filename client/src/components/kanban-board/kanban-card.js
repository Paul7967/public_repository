import React from 'react';

const KanbanCard = ({label, deadline_date, id}) => (
	<div className="card shadow-sm mb-1">
		<div className="card-body p-2">
			<div className="card-title mt-1">
				<h6>{label}</h6>
			</div>
			<p>
				{deadline_date}
			</p>
		</div>
	</div>
);

export default KanbanCard;