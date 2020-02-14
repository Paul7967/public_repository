import React from 'react';

import './item-status-filter.css';

export const ItemStatusFilter = ({ filter, onSwithFilter }) => {
	const buttonsArr = [
		{name: 'all', label: 'All'},
		{name: 'active', label: 'Active'},
		{name: 'done', label: 'Done'}
	]
		
	const btnPressedClassName = 'btn btn-success';
	const btnUnPressedClassName = "btn btn-outline-secondary";

	const buttons = buttonsArr.map(({name, label}) => {
		const btnClassName = (filter===name) ? btnPressedClassName : btnUnPressedClassName;
		return (
			<button type="button"
					className={btnClassName}
					onClick={() => onSwithFilter(name)} 
					key={name} >
				{label}
			</button>
		);
	});
	
	return (
		<div className="btn-group">
			{buttons}
		</div>
	);
}