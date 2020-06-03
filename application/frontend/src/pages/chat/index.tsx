import * as React from 'react';
import { connect } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { chatsGetMessages, chatAddMessage } from '../../api/';
import { makeApiRequest } from '../../api/utils';

import { MessagesList } from './Messages';
import { MessageField } from './MessageField';


const useMessagesGetRequest = makeApiRequest(async (chatId) => {
	const response = await chatsGetMessages({ chatId });
	return response;
});


const ChatRaw = (props) => {
	const chatId = props.match.params.chatId;
	const messages = useMessagesGetRequest(chatId);

	const handleMesssageSend = React.useCallback((message) => {
		chatAddMessage({ chatId: chatId, userId: props.user.id, text: message }).then(res => {
			// messages.setResponse([res.item, ...messages.state.response]);
			messages.setResponse({
				...messages.state.response,
				messages: [
					res.item,
					...messages.state.response.messages,
				]
			});
		});
	}, [messages.state.response]);

	return (
		<React.Fragment>
			<Grid container>
				<Grid item container xs={12} component={Paper} square elevation={0}>
					<MessageField messages={messages} onMessageSend={handleMesssageSend} />
				</Grid>
				<Grid item container xs={12} component={Paper} square elevation={0}>
					<MessagesList messages={messages} />
				</Grid>
			</Grid>
		</React.Fragment>
	);
};

const Chat = connect(
	state => ({
		user: state.user,
	})
)(ChatRaw);

export default Chat;
