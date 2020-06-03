import * as React from 'react';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { MessagesList } from './Messages';
import { MessageField } from './MessageField';


const Chat = (props) => {
	const chatId = props.match.params.chatId;
	console.log(chatId);
	return (
		<React.Fragment>
			<Grid container>
				<Grid item container xs={12} component={Paper} square elevation={0}>
					<MessageField />
				</Grid>
				<Grid item container xs={12} component={Paper} square elevation={0}>
					<MessagesList chatId={props.match.params.chatId} />
				</Grid>
			</Grid>
		</React.Fragment>
	);
};


export default Chat;
