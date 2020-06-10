import * as React from 'react';
import { connect } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import { chatsGetMessages, chatAddMessage } from '../../api/';
import { makeApiRequest } from '../../api/utils';

import { MessagesList } from './Messages/';
import { MessageField } from './MessageField/';

import { useSocket } from "use-socketio";


const useMessagesGetRequest = makeApiRequest(async (chatId) => {
	const response = await chatsGetMessages({ chatId });
	return response;
});


export const Chat = (props) => {
	const chatId = props.match.params.chatId;
	
	const messages = useMessagesGetRequest(chatId);

	const messageIO = useSocket(`message ${chatId}`, newMessage => {
		messages.setResponse({
			...messages.state.response,
			messages: [
				newMessage,
				...messages.state.response.messages,
			]
		});
	});

	return (
		<React.Fragment>
			<Grid container>
				<Grid item container xs={12}>
					<MessageField messages={messages} chatId={chatId} />
				</Grid>
				<Grid item container xs={12}>
					<MessagesList messages={messages} />
				</Grid>
			</Grid>
		</React.Fragment>
	);
};


export default Chat;
