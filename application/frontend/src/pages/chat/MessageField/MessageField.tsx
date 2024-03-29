import * as React from 'react';
import { connect } from 'react-redux';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import InputAdornment from '@material-ui/core/InputAdornment';
import SendIcon from '@material-ui/icons/Send';

import { MoreChatMenu } from './MoreChatMenu';

import { chatAddMessage } from '../../../api/';


const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		positionedBottom: {
			position: 'fixed',
			top: '64px',
			right: '0',
			zIndex: 2,
			width: 'calc(100% - 240px)',
			padding: '1em',
			borderBottom: '1px solid #eee',
			boxShadow: '0px 0px 20px -10px rgba(0,0,0,0.2)',
			[theme.breakpoints.down('xs')]: {
				width: '100%',
			}
		},
		cursorPointer: {
			cursor: 'pointer',
		},
		spacer: {
			height: '150px',
			width: '100%',
		}
	}),
);


export const MessageFieldRaw = (props) => {
	const classes = useStyles();

	const [ message, setMessage ] = React.useState('');

	const handleChange = React.useCallback((e) => {
		setMessage(e.target.value);
	}, []);

	const handleSubmit = React.useCallback(async (e) => {
		if (message.length) {
			setMessage('');
			chatAddMessage({ chatId: props.chatId, text: message })
		}
	}, [message, props.chatId]);

	return (
		<React.Fragment>
			<Grid className={classes.spacer}></Grid>
			<Grid className={classes.positionedBottom} container component={Paper} square elevation={0}>
				<Grid item container xs={12} direction="row" alignItems="center" justify="space-between">
					<Typography variant="h4" gutterBottom>
						Чат
						<MoreChatMenu
							chatId={props.chatId}
							user={props.user}
						/>
					</Typography>
					<Typography variant="body2" color="textSecondary" gutterBottom>{props.messages.state.response ? props.messages.state.response.chat.title : 'Завантаження...'}</Typography>
				</Grid>
				<Grid item xs={12}>
					<TextField
						fullWidth
						multiline
						onChange={handleChange}
						value={message}
						rows={2}
						label="Повідомлення"
						variant="outlined"
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<SendIcon
										color="primary"
										fontSize="large"
										onClick={handleSubmit}
										className={classes.cursorPointer}
									/>
								</InputAdornment>
							),
						}}
					/>
				</Grid>
			</Grid>
		</React.Fragment>
	);
};


export const MessageField = connect(
	(state: any) => ({
		user: state.user,
	})
)(MessageFieldRaw);