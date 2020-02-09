import React, { Component } from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component {

	buttons = [
		{name: 'all', label: 'All'},
		{name: 'active', label: 'Active'},
		{name: 'done', label: 'Done'}
	]

	
	render() {
		const {filter, onSwithFilter} = this.props;
		
		const btnPressedClassName = 'btn btn-success';
		const btnUnPressedClassName = "btn btn-outline-secondary";
		

		const buttons = this.buttons.map(({name, label}) => {
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
	};
};