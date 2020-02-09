import React, { Component } from 'react';

import './view-switch-panel.css';

export default class ViewSwitchPanel extends Component {

	buttons = [
		{name: 'short', label: 'Short'},
		{name: 'full', label: 'Full'},
		{name: 'scrum', label: 'Scrum'}
	]

	
	render() {
		const {view, onSwithcView} = this.props;
		
		const btnPressedClassName = 'btn btn-success';
		const btnUnPressedClassName = "btn btn-outline-secondary";
		

		const buttons = this.buttons.map(({name, label}) => {
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
};