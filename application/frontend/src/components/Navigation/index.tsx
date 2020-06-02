import { connect } from 'react-redux';
import { Navigation } from './Navigation';

export { Navigation }

export const NavigationConnected = connect(
	state => ({
		user: state.user,
	})
)(Navigation)