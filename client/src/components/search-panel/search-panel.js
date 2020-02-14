import React, { useState } from 'react';
import './search-panel.css';

export const SearchPanel = ({ onSearchInList }) => {
	const [filterText, setFilterText] = useState('');

	const onChange = (e) =>{
		const filterTextVal = e.target.value;
		setFilterText(filterTextVal);
		onSearchInList(filterTextVal);
	};

	return (
		<input 
			type='text' 
			className="search-input" 
			placeholder='type to search'
			onChange={onChange} 
			value={filterText}>
		</input>
	);
};