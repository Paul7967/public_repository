import React, {useState, useEffect, useContext} from 'react';
import { useHttp } from '../../../hooks/http-hook';
import { AuthContext } from '../../../context/auth-context';
import {isEmail, isLength} from 'validator';
import './auth-page.sass';

export const AuthPage = () => {
	const auth = useContext(AuthContext);
	const {loading, request, error, clearError} = useHttp();
	const [form, setForm] = useState({
		email: "", 
		password: ""
	});
	const [emailValidation, setEmailValidation] = useState({
		isValid: false,
		feedbackText: '',
		feedbackClassNames: '',
		inputClassNames: 'form-control'
	});

	const [fieldsValidation, setFieldsValidation] = useState({
		email: {
			isValid: false,
			feedbackText: '',
			feedbackClassNames: '',
			inputClassNames: 'form-control'},
		password: {
			isValid: false,
			feedbackText: '',
			feedbackClassNames: '',
			inputClassNames: 'form-control'}
	});

	useEffect(() => {
		if (error) {
			alert(error);
			clearError()
		}
	}, [error, clearError]);

	const changeHandler = event => {
		const input = event.target;
		let {name: inputName, value: inputValue} = input;
		validateInputValue(inputName, inputValue, input);
	}
	
	const pressHandler = event =>{
		if (event.key === 'Enter') {
			onLoginBtnClick();
		}
	}

	const onRegisterBtnClick = async () => {
		try {
			const data = await request('/api/auth/register', 'POST', {...form})
			
			if (data && data.message === "User created") {
				onLoginBtnClick();
			}
		} catch (e) {
			// catch already handled in useHttp
		}		
	}
	
	const onLoginBtnClick = async () => {
	try {
			const {token, userId} = await request('/api/auth/login', 'POST', {...form})
			auth.login(token, userId, form.email);
		} catch (e) {
			// catch already handled in useHttp
		}		
	}
	const validateInputValue = (inputName, inputValue, input) => {

		const setValueToState = () => {
			setForm({ 
				...form,
				[inputName]: inputValue
			});
		};

		const classNames = {
			fb: {valid: 'valid-feedback', invalid: 'invalid-feedback'},
			input: {valid: 'form-control is-valid', invalid: 'form-control is-invalid'}
		}

		let fieldValid;

		switch (inputName) {
			case "email":
				fieldValid = isEmail(inputValue);
				if (fieldValid) {
					setEmailValidation({
						isValid: fieldValid,
						feedbackText: 'Email is correct!',
						feedbackClassNames: classNames.fb.valid,
						inputClassNames: classNames.input.valid	
					});
					setValueToState();
				} else {
					setEmailValidation({
						isValid: fieldValid,
						feedbackText: 'Email is incorrect!',
						feedbackClassNames: classNames.fb.invalid,
						inputClassNames: classNames.input.invalid	
					})
				}
				break;
			case "password":
					fieldValid = isLength(inputValue, { min: 6, max: 20 });
					if (fieldValid) {
						setFieldsValidation({
							...fieldsValidation,
							password: {
								isValid: fieldValid,
								feedbackText: 'Password length is sufficient',
								feedbackClassNames: classNames.fb.valid,
								inputClassNames: classNames.input.valid	
							}
						});
						setValueToState();
					} else {
						setFieldsValidation({
							...fieldsValidation,
							password: {
								isValid: fieldValid,
								feedbackText: 'Password length should be between 6 and 20 symbols',
								feedbackClassNames: classNames.fb.invalid,
								inputClassNames: classNames.input.invalid	
							}
						})
					}
				break;
			default:
				setValueToState();
		}
	}

	return (
		<div>
			<div className="row" id="row-auth">
					<div className="card text-dark bg-light mb-3" style={{maxWidth: "20rem"}} >
						<div className="card-header">Authorization</div>
						<div className="card-body">
							<label htmlFor="email">Email address</label>
							<input 
								name="email"  
								placeholder="Enter email"
								className={emailValidation.inputClassNames}
								type="email" 
								id="email" 
								aria-describedby="emailHelp" 
								onChange = {changeHandler}
								onKeyPress={pressHandler}
							/>
							<div name="email-validation-feedback" className={emailValidation.feedbackClassNames}>{emailValidation.feedbackText }</div>
							
							<small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
							
							<label htmlFor="password">Password</label>
							<input 
								name="password" 
								placeholder="Enter password"
								className={fieldsValidation.password.inputClassNames} 
								type="password" 
								id="password" 
								onChange = {changeHandler}
								disabled = { loading }
								onKeyPress={pressHandler}
							/>
							<div name="password-validation-feedback" className={fieldsValidation.password.feedbackClassNames}>{fieldsValidation.password.feedbackText}</div>
						
						</div>

						<div className="card-body text-center">
							<button 
								className="btn btn-success btn-auth"
								onClick = { onLoginBtnClick }
								disabled = { loading }
							>
								Login
							</button>
							<button 
								className="btn btn-secondary btn-auth" 
								id="btn-register" 
								onClick = { onRegisterBtnClick }
								disabled = { loading }
							>
								Register
							</button>
						</div>	
					</div>
			</div>
		</div>
	)
}