import React, {useState, useEffect, useContext} from 'react';
import { useHttp } from '../../../hooks/http-hook';
import { AuthContext } from '../../../context/auth-context';
import './auth-page.sass';

export const AuthPage = () => {
	const auth = useContext(AuthContext);
	const {loading, request, error, clearError} = useHttp();
	const [form, setForm] = useState({
		email: "", 
		password: ""
	});

	useEffect(() => {
		if (error) {
			alert(error);
			clearError()
		}
	}, [error, clearError]);

	const changeHandler = event => {
		setForm({ ...form, [event.target.name]: event.target.value });
	}
	
	const onRegisterBtnClick = async () => {
		try {
			const data = await request('/api/auth/register', 'POST', {...form})
			
			console.log('Server response: ',data.message);
		} catch (e) {
			// catch already handled in useHttp
		}		
	}
	
	const onLoginBtnClick = async () => {
	try {
			const {token, userId} = await request('/api/auth/login', 'POST', {...form})
			auth.login(token, userId);
		} catch (e) {
			// catch already handled in useHttp
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
								className="form-control"
								type="email" 
								id="email" 
								aria-describedby="emailHelp" 
								onChange = {changeHandler}
							/>
							
							<small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
							
							<label htmlFor="password">Password</label>
							<input 
								name="password" 
								placeholder="Enter password"
								className="form-control" 
								type="password" 
								id="password" 
								onChange = {changeHandler}
								disabled = { loading }
							/>
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