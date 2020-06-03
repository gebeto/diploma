import * as React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import CircularProgress from '@material-ui/core/CircularProgress';

import { chatsGetMessages } from '../../api/';
import { makeApiRequest } from '../../api/utils';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: '100%',
		}
	}),
);

export const MessageItem = (props: { message: any }) => {
	return (
		<ListItem>
			<ListItemAvatar>
				<Avatar>SA</Avatar>
			</ListItemAvatar>
			<ListItemText primary="Slavik Nychkalo" secondary={props.message.data.text} />
			<ListItemSecondaryAction>
				<Typography variant="overline" color="textSecondary">{props.message.time}</Typography>
			</ListItemSecondaryAction>
		</ListItem>
	);
}

const useMessagesGetRequest = makeApiRequest(async (chatId) => {
	const response = await chatsGetMessages({ chatId });
	return response.items;
});

export const MessagesList = (props) => {
	const classes = useStyles();

	const messages = useMessagesGetRequest(props.chatId);
	// console.log('MESS', messages);

	if (messages.state.isFetching) {
		return (
			<List classes={classes}>
				<ListItem>
					<Grid container justify="center" alignItems="center" direction="column">
						<CircularProgress />
					</Grid>
				</ListItem>
			</List>
		);
	}

	if (messages.state.isFetchingError) {
		return (
			<List classes={classes}>
				<ListItem>
					<Grid container justify="center" alignItems="center" direction="column">
						Помилка завантаження!
						<Button color="primary" onClick={messages.refetch}>Спробувати знову</Button>
					</Grid>
				</ListItem>
			</List>
		);
	}

	return (
		<List classes={classes}>
			{messages.state.response.map(message =>
				<MessageItem key={message.id} message={message} />
			)}
		</List>
	);
}