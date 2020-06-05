import { connect } from 'react-redux';
import { Navigation } from './Navigation';

export { Navigation }

export const NavigationConnected = connect(
	state => {
		return {
			user: state.user,
		}
	}
)(Navigation)