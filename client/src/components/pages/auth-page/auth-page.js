import React, {useState} from 'react';
import './auth-page.sass';
import { useHttp } from '../../../hooks/http.hooks';

export const AuthPage = () => {
	const {loading, request, error} = useHttp();
	const [form, setForm] = useState({
		email: "", 
		password: ""
	});

	const changeHandler = event => {
		setForm({ ...form, [event.target.name]: event.target.value });
	}
	
	const registerHandler = async () => {
		try {
			const data = await request('http://localhost:5000/api/auth/register', 'POST', {...form})
			
			// const response = await fetch('/api/auth/register', {method: "POST", body: JSON.stringify({...form})});
			// const response = await fetch('http://localhost:5000/api/auth/register', {method: "POST", body: JSON.stringify({...form})});
			// const data = await response.json();
			
			console.log('Ответ сервера: ',data);
		} catch (e) {

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
							/>
						</div>

						<div className="card-body text-center">
								<button 
									className="btn btn-success btn-auth"
									disabled = { loading }
								>
									Login
								</button>
								<button 
									className="btn btn-secondary btn-auth" 
									// onClick = { registerHandler }
									disabled = { loading }
									id="btn-register" 
								>
									Register
								</button>
						</div>	
					</div>
			</div>
		</div>
	)
}