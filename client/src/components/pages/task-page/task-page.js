import React, {useState, useEffect, useCallback, useContext} from 'react';
import {isInt, isLength} from 'validator';
import { useHttp } from '../../../hooks/http-hook';
import {useParams} from 'react-router-dom';
import { AuthContext } from '../../../context/auth-context';
import Loader from './../../loader/index';

import './task-page.sass';


export const TaskPage = () => {
	const {token} = useContext(AuthContext);
	const {request, loading} = useHttp();
	const taskId = useParams().id;

	const [form, setForm] = useState({
		label:"",
		description:"",
		important:false,
		status:10,
		add_date:"",
		deadline_date:"",
		execution_time_plan:"",
		execution_time_fact:"",
		_id:"",
		user_id: "",
		validation: {
			labelValidationText: '',
			labelIsValid: false,
			execution_time_planValidationText: '',
			execution_time_planIsValid: false,
			execution_time_factValidationText: '',
			execution_time_factIsValid: false
		}
	});

	const getTask = useCallback(async() => {
		try {
			const taskData = await request(`/api/tasks/${taskId}`, 'GET', null, {
				authorization: `Bearer ${token}` 
			})
			if (taskData) {
				setForm({...form, ...taskData})
				return taskData
			}
		} catch (e) {}
	}, [token, taskId, request])

	useEffect(() => {
		getTask()
	},[getTask]);

	const updateTask = async(taskToEdit) => {
		try {
			const taskData = await request(
				`/api/tasks/edit`, 
				'POST',
				{...taskToEdit}, 
				{authorization: `Bearer ${token}` }
			)
			if (taskData && taskData.message === "Task edited") {
				getTask();
			}
		} catch (e) {}
	};

	const validateInputValue = (inputName, inputValue, input) => {
		const setInputValidation = (input, isValid) => {
			const feedbackElementName = input.name + "-validation-feedback";
			const feedbackElement = document.getElementsByName(feedbackElementName)[0];
			if (isValid) {
				input.classList.add("is-valid");
				input.classList.remove("is-invalid");
				feedbackElement.classList.add("valid-feedback")
				feedbackElement.classList.remove("invalid-feedback")
			} else {
				input.classList.remove("is-valid");
				input.classList.add("is-invalid");
				feedbackElement.classList.add("invalid-feedback")
				feedbackElement.classList.remove("valid-feedback")
			};
		};

		const setValueToState = () => {
			setForm({ 
				...form,
				[inputName]: inputValue
			});
		};

		const setValidationToState = (fieldName, isValid, validationText) => {
			const isValidFieldName = fieldName + "IsValid";
			const validationTextFieldName = fieldName + "ValidationText";
			
			setForm({ 
				...form,
				[inputName]: inputValue, 
				validation: {
					...form.validation, 
					[isValidFieldName]:isValid, 
					[validationTextFieldName]:validationText
				}  
			});
		};
	
		switch (inputName) {
			case "label":
				if (isLength(inputValue, { min: 3, max: 25 })) {
					setValidationToState(inputName, true, "Success! You've done it.");
					setInputValidation(input, true);
				} else {
					setValidationToState(inputName, false, "Field length should be from 3 to 25 characters.")
					setInputValidation(input, false);
				}
				break;
			case "execution_time_plan":
			case "execution_time_fact":
				if (isInt(inputValue, { min: 1, max: 65 })) {
					setValidationToState(inputName, true, "Success! You've done it.");
					setInputValidation(input, true);
				} else {
					setValidationToState(inputName, false, "Value should be between 1 and 65.")
					setInputValidation(input, false);
				}
				break;
			case "position": 
				if (inputValue!=="") {
					setValidationToState(inputName, true, "Success! You've done it.");
					setInputValidation(input, true);
				} else {
					setValidationToState(inputName, false, "Field should be filled.")
					setInputValidation(input, false);
				}
				break;
			default:
				setValueToState();
		}
	}

	const changeHandler = event => {
		const input = event.target;
		let {name: inputName, value: inputValue} = input;
		if (input.type==="checkbox") {
			inputValue = input.checked;
		}
		validateInputValue(inputName, inputValue, input);
	};
	
	const btnOKHandler = async () => {
		const {validation, ...editTask} = form;
		updateTask(editTask)
	}
	
	if (loading) {
		return <Loader />
	}

	return (
		<div className="container">
			<div className="card mb-3 w-90 p-2 text-white bg-light" >
				<div className="card-header text-dark font-weight-bold">{form.label}</div>
				<div className="card-body">

					<div className="d-flex flex-wrap justify-content-start">
						<div className="mr-3">
							<label className="text-success" htmlFor="label">Label</label>
							<input 
								name="label" 
								placeholder="Enter Label"
								className="form-control mb-2 label-input" 
								type="text" 
								id="label" 
								defaultValue={form.label}
								onChange = {changeHandler}
							/>
							<div name="label-validation-feedback" className="invalid-feedback">{form.validation.labelValidationText}</div>
						</div>

						<div className="form-group cb-status mr-3">
							<label className="text-success" htmlFor="cbstatus">Status</label>
							<select 
								name="status" 
								value={form.status} 
								onChange = {changeHandler} 
								className="form-control" 
								id="cbstatus" 
							>
								<option value="10">To do</option>
								<option value="20">In process</option>
								<option value="30">Done</option>
							</select>
							<div name="position-validation-feedback" className="invalid-feedback">{form.validation.positionValidationText}</div>
						</div>

						<fieldset className="form-group">
							<label className="text-success">Important</label>
							<div className="form-check">
								<label className="form-check-label">
									<input 
										name="important" 
										onChange = {changeHandler} 
										className="form-check-input" 
										type="checkbox" 
										checked={form.important}
										/>
									Important
								</label>
							</div>
						</fieldset>
					</div>
				
					<label className="text-success" htmlFor="description">Dscription</label>
					<textarea 
						name="description" 
						placeholder="Enter description"
						className="form-control mb-2 textarea_desription" 
						type="text" 
						id="description" 
						onChange = {changeHandler}
						defaultValue={form.description}
					/>
					<div name="description-validation-feedback" className="invalid-feedback">{form.validation.surnameValidationText}</div>

					<div className="d-flex flex-wrap justify-content-between">
						<div>
							<label className="text-success" htmlFor="add_date">Add date</label>
							<input 
								name="add_date" 
								className="form-control mb-2" 
								type="date" 
								defaultValue={form.add_date}
								id="add_date" 
								onChange = {changeHandler}
							/>
							<div name="age-validation-feedback" className="invalid-feedback">{form.validation.ageValidationText}</div>
						</div>
						<div>
							<label className="text-success" htmlFor="deadline_date">Deadline</label>
							<input 
								name="deadline_date" 
								className="form-control mb-2" 
								type="date" 
								id="deadline_date" 
								defaultValue={form.deadline_date}
								onChange = {changeHandler}
							/>
							<div name="age-validation-feedback" className="invalid-feedback">{form.validation.ageValidationText}</div>
						</div>
						
						<div className="number-field">
							<label className="text-success" htmlFor="execution_time_plan">Execution time (plan)</label>
							<input 
								name="execution_time_plan" 
								className="form-control mb-2" 
								type="number" 
								id="execution_time_plan" 
								defaultValue={form.execution_time_plan}
								onChange = {changeHandler}
							/>
							<div name="execution_time_plan-validation-feedback" className="invalid-feedback">{form.validation.execution_time_planValidationText}</div>
						</div>
						<div className="number-field">
							<label className="text-success" htmlFor="execution_time_fact">Execution time (fact)</label>
							<input 
								name="execution_time_fact" 
								className="form-control mb-2" 
								type="number" 
								id="execution_time_fact" 
								defaultValue={form.execution_time_fact}
								onChange = {changeHandler}
							/>
							<div name="execution_time_fact-validation-feedback" className="invalid-feedback">{form.validation.execution_time_factValidationText}</div>
						</div>
					</div>

				</div>
				<div className="card-body" id="card-btn-ok">
					<button 
						className="btn btn-success btn-ok" 
						onClick = { btnOKHandler }
						// disabled = { loading }
						id="btn-ok" 
					>
						OK
					</button>
				</div>	
			</div>
		</div>
	)
};