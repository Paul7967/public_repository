import React, { Component } from 'react';
import './search-panel.css';

export default class SearchPanel extends Component {
	
	state = {
		filterText: ''
	};

	onChange = (e) =>{
		const filterText = e.target.value;
		this.setState({	filterText });
		this.props.onSearchInList(filterText);
	};

	render () {

		return <input type='text' className="search-input" placeholder='type to search'
		onChange={ this.onChange } 
		value={this.state.filterText}>
		</input>;
	};
};
