import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import { useRoutes } from '../routes/routes';

import './app.css';

const App = () => {
	const isAuthenticated = true;
	const routes = useRoutes(isAuthenticated);
	return (
		<Router>
			{routes}
		</Router>
	)
}

export default App;
