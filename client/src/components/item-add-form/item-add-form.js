import React, { useState } from 'react';
import './item-add-form.css';

export const ItemAddForm = ({ onItemAdded }) => {
	const [label, setLabel] = useState('');

	const onLabelChange = (e) => {
		setLabel(e.target.value);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		
		if (label.length>0) {
			onItemAdded(label);
			setLabel('')
		} else {
			alert('Input the task text!');
		};
	};

	return (
		<form className='item-add-form d-flex'
			onSubmit={onSubmit}>

			<input type='text' className='form-control' 
				onChange={onLabelChange}
				placeholder='What needs to be done'
				value={label} >
			</input>
			<button className='btn btn-outline-secondary' >
				Add item
			</button> 
		</form>
	)
} 

