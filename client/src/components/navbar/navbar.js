import React from 'react';
import {NavLink} from 'react-router-dom';

export const Navbar = (isAuthenticated) => {
	return(
		<nav className="navbar navbar-expand-md navbar-dark bg-success">
			<div className="container">
				<NavLink exact className="navbar-brand" to="/"><h3>Todo List</h3></NavLink>
				
				{<div className="navbar-collapse">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item">
							{(isAuthenticated)&&<NavLink exact className="nav-link" to="/tasklist">Task list</NavLink>}
						</li>
						{/* <li className="nav-item">
							{(isAuthenticated)&&<NavLink exact className="nav-link" to="/tasklist/:id">Task</NavLink>}
						</li> */}
					</ul>
				</div>}
				<div className="navbar-nav">
					{(!isAuthenticated)&&<NavLink className="nav-link " to="/auth">Login</NavLink>}
					{(isAuthenticated)&&<NavLink className="nav-link " to="/auth">Logout</NavLink>}
				</div>
			</div>	
		</nav>
	)
}