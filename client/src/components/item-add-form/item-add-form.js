import React, { Component } from 'react';
import './item-add-form.css';

export default class ItemAddForm extends Component {

	state = {
		label: ''
	};

	onLabelChange = (e) => {
		this.setState({
			label: e.target.value
		});
	};

	onSubmit = (e) => {
		e.preventDefault();
		if (this.state.label.length>0) {
			this.props.onItemAdded(this.state.label);
			this.setState({
				label: ''
			});
		} else {
			alert('Input the task text!');
		};
	};

	render () {
		return (
			<form className='item-add-form d-flex'
			  onSubmit={this.onSubmit}>

				<input type='text' className='form-control' 
				  onChange={this.onLabelChange}
				  placeholder='What needs to be done'
				  value={this.state.label} >
				</input>
				<button className='btn btn-outline-secondary' >
					Add item
				</button> 
			</form>
		);
	};
};
// 
