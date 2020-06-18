import * as React from 'react';
import { connect } from 'react-redux';

import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import { ApiClient } from '../../api/utils/ApiClient';
import { makeBasicApiRequest } from '../../api/utils/';
import { userSlice } from '../../store/slice-user';


const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		wrapper: {
			height: '100%',
		},
		fields: {
			width: '100%',
		},
		backdrop: {
			zIndex: 10000,
		}
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
	const login = await ApiClient.login(email, password).catch(err => err);
	return login;
});

const authError = {
	error: true,
	helperText: "Incorrect password!"
}

const useAuth = () => {
	const [isAuth, setIsAuth] = React.useState(ApiClient.getInstance().isAuthorized());

	React.useEffect(() => {
		ApiClient.onAuthorized(() => {
			console.log("AUTH");
			setIsAuth(true);
		});

		ApiClient.onUnauthorized(() => {
			console.log("UNAUTH");
			setIsAuth(false);
		});
	}, []);

	return isAuth;
}

export const Auth = (props) => {
	const isAuth = useAuth();

	const auth = useAuthApiRequest();

	const [ login, handleLoginChange ] = useInput();
	const [ password, handlePasswordChange ] = useInput();

	const handleLogin = React.useCallback((e: any) => {
		if (e) {
			e.preventDefault();
			e.stopPropagation();
		}
		auth.fetch(login, password);
	}, [login, password]);

	const classes = useStyles();

	const errorFields = auth.state.response && auth.state.response.error && auth.state.response.error.fields;

	return (isAuth ? props.children :
		<Box height="70vh" boxSizing="border-box" component="form" onSubmit={handleLogin}>
			<Grid className={classes.wrapper} container alignItems="center" justify="center">
				<Grid className={classes.fields} container item xs={10} sm={5} md={3} xl={2} spacing={3} direction="column">
					<Grid item xs={12}>
						<Typography variant="h3" component="h3" align="center">Студпост</Typography>
					</Grid>
					<Grid item xs={12}>
						<TextField 
							value={login}
							onChange={handleLoginChange}
							fullWidth
							label="Email"
							variant="outlined"
							type="email"
							name="email"
							error={errorFields && errorFields.email}
							helperText={errorFields && errorFields.email}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							value={password}
							onChange={handlePasswordChange}
							fullWidth
							label="Password"
							variant="outlined"
							type="password"
							name="password"
							error={errorFields && errorFields.password}
							helperText={errorFields && errorFields.password}
						/>
					</Grid>
					<Grid item xs={12}>
						<Button type="submit" onClick={handleLogin} fullWidth variant="outlined" color="primary" size="large">Login</Button>
					</Grid>
				</Grid>
			</Grid>
			<Backdrop className={classes.backdrop} open={auth.state.isFetching}>
				<CircularProgress color="inherit" />
			</Backdrop>
		</Box>
	);
}
