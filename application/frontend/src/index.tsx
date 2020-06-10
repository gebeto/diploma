import 'regenerator-runtime/runtime';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux'

import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';

import {
	HashRouter,
	Switch,
	Route,
	Link,
	useRouteMatch,
	useParams
} from "react-router-dom";

import { store } from './store/';
import { Navigation, NavigationConnected } from './components/Navigation/';
import { Auth } from './components/Auth/';

import Dashboard from './pages/dashboard/';
import Chat from './pages/chat/';
import Schedule from './pages/schedule/';
import Students from './pages/students/';
import Academics from './pages/academics/';
import Settings from './pages/settings/';

import './styles.scss';
import { ApiClient } from './api/utils/ApiClient';

import { SocketIOProvider, useSocket } from "use-socketio";


const App = (props) => {
	const sock = useSocket('auth', () => {
		sock.socket.emit('auth', ApiClient.getToken());
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


ReactDOM.render(
	(
		<Provider store={store}>
			<Auth>
				<SocketIOProvider url="/">
					<HashRouter>
						<App />
					</HashRouter>
				</SocketIOProvider>
			</Auth>
		</Provider>
	),
	document.getElementById('root')
);
