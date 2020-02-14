import React, { useContext, Fragment } from 'react';
import {NavLink} from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';

export const Navbar = () => {
	const auth = useContext(AuthContext);
	const isAuthenticated = !!auth.token;
	const logoutHandler = () => {
		auth.logout();
	}

	return(
		<nav className="navbar navbar-expand-md navbar-dark bg-success">
			<div className="container">
				<NavLink exact className="navbar-brand" to="/"><h3>Todo List</h3></NavLink>
				{<div className="navbar-collapse">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item">
							{(isAuthenticated)&&<NavLink exact className="nav-link" to="/tasklist">Task list</NavLink>}
						</li>
					</ul>
				</div>}
				<div className="navbar-nav">
				{
					(isAuthenticated) && 
					<Fragment>
						<span className="nav-link text-white" >{auth.userEmail}</span>
						<NavLink
							className="nav-link " 
							to="/auth"
							onClick={logoutHandler} >
							Logout
						</NavLink>	
					</Fragment>
					
				}
				</div>
			</div>	
		</nav>
	)
}