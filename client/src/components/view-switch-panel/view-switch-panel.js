import React from 'react';

import './view-switch-panel.css';

export const ViewSwitchPanel = ({ view, onSwithcView }) => {
	const buttonsArr = [
		{name: 'short', label: 'Short'},
		{name: 'full', label: 'Full'},
		{name: 'scrum', label: 'Scrum'}
	];

	const btnPressedClassName = 'btn btn-success';
	const btnUnPressedClassName = "btn btn-outline-secondary";

	const buttons = buttonsArr.map(({name, label}) => {
		const btnClassName = (view===name) ? btnPressedClassName : btnUnPressedClassName;
		return (
			<button type="button"
					className={btnClassName}
					onClick={() => onSwithcView(name)} 
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
};