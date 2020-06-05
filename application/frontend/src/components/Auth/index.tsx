import * as React from 'react';
import { connect } from 'react-redux';

import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { ApiClient } from '../../api/utils/ApiClient';
import { makeBasicApiRequest } from '../../api/utils/';


const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		wrapper: {
			height: '100%',
		},
		fields: {
			width: '100%',
		},
	}),
);

export const useInput = () => {
	const [ value, setValue ] = React.useState('');

	const handleChange: any = React.useCallback((e) => {
		setValue(e.target.value);
	}, [value]) as any;

	return [ value, handleChange ];
}

const useAuthApiRequest = makeBasicApiRequest(async (email: string, password: string) => {
	const login = await ApiClient.getInstance().login(email, password);
	return login.token;
})

export const AuthRaw = (props) => {
	const isAuth = ApiClient.getInstance().isAuthorized();

	const auth = useAuthApiRequest();

	const [ login, handleLoginChange ] = useInput();
	const [ password, handlePasswordChange ] = useInput();

	const handleLogin = React.useCallback(() => {
		auth.fetch(login, password).then(console.log);
	}, [login, password])

	const classes = useStyles();

	return (isAuth ? props.children :
		<Box height="70vh" boxSizing="border-box">
			<Grid className={classes.wrapper} container alignItems="center" justify="center">
				<Grid className={classes.fields} container item xs={10} sm={3} spacing={3} direction="column">
					<Grid item xs={12}>
						<Typography variant="h1" component="h1" align="center">Вхід</Typography>
					</Grid>
					<Grid item xs={12}>
						<TextField value={login} onChange={handleLoginChange} fullWidth label="Логін" variant="outlined" type="text" name="email" />
					</Grid>
					<Grid item xs={12}>
						<TextField value={password} onChange={handlePasswordChange} fullWidth label="Пароль" variant="outlined" type="password" name="password" />
					</Grid>
					<Grid item xs={12}>
						<Button  onClick={handleLogin} fullWidth variant="outlined" color="primary" size="large">Увійти</Button>
					</Grid>
				</Grid>
			</Grid>
		</Box>
	);
}


export const Auth = connect(
	(state) => ({
		user: state.user,
	})
)(AuthRaw)

