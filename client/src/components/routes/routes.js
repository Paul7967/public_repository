import React, {Fragment} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Navbar from '../navbar';
import ListPage from '../pages/list-page';
import TaskPage from '../pages/task-page';
import AuthPage from './../pages/auth-page';

export const useRoutes = (isAuthenticated) => {
	if (isAuthenticated) {
		return (
			<Fragment>
				<Navbar isAuthenticated={isAuthenticated} />
				<div className="container pt-4">
					<Switch>
						{/* <Route path="/" exact component={ListPage} /> */}
						<Route path="/tasklist" exact component={ListPage} />
						<Route path="/tasklist/:id" 
							render={({match}) => {
								const {id} = match.params;
								return <TaskPage taskId={id}/>
							}} />
						<Route path="/auth" component={AuthPage} />
						<Redirect to="/tasklist" />
					</Switch>
				</div>	
			</Fragment>		
		)
	} else {
		return (
			<Fragment>
				<Navbar isAuthenticated={isAuthenticated}/>
				<div className="container pt-4">
					<Switch>
						<Route path="/" exact component={AuthPage} />>
						<Redirect to="/" />
					</Switch>
				</div>	
			</Fragment>	
		)
	}
	// return (
	// 	<Fragment>
	// 		<Navbar />
	// 		<div className="container pt-4">
	// 			<Switch>
					// <Route path="/" exact component={ListPage} />
					// <Route path="/tasklist" exact component={ListPage} />
					// <Route path="/task:id" component={TaskPage} />
					// {/* <Route path="/about" component={About} /> */}
					// <Redirect to="/" />
	// 			</Switch>
	// 		</div>	
	// 	</Fragment>		
	// )
}