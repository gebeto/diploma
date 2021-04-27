import React from 'react';

import Typography from '@material-ui/core/Typography';

import { Switch, Route } from "react-router-dom";
import { useSocket } from "use-socketio";

import { NavigationConnected } from './components/Navigation/';
// import Dashboard from './pages/dashboard/';
import Dashboard from './pages/dashboard-2/';
import Chat from './pages/chat/';
import Schedule from './pages/schedule/';
import Students from './pages/students/';
import Academics from './pages/academics/';
import Settings from './pages/settings/';

import { ApiClient } from './api/utils/ApiClient';


export const App: React.FC = () => {
	const sock = useSocket('auth', () => {
		sock.socket.emit('auth', ApiClient.getInstance().getToken());
	});

	return (
		<NavigationConnected>
			<Switch>
				<Route exact path="/" component={Dashboard} />
				<Route exact path="/chat/:chatId" component={Chat} />
				<Route exact path="/schedule" component={Schedule} />
				<Route exact path="/students" component={Students} />
				<Route exact path="/academics" component={Academics} />
				<Route exact path="/settings" component={Settings} />
				<Route path="*">
					<Typography variant="h2">404, PAGE NOT FOUND</Typography>
				</Route>
			</Switch>
		</NavigationConnected>
	);
}
