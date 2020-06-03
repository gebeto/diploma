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

export const MessagesList = ({ messages }) => {
	const classes = useStyles();

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
			{messages.state.response.messages.length ? messages.state.response.messages.map(message =>
				<MessageItem key={message.id} message={message} />
			) : <ListItem>
					<Grid container justify="center" alignItems="center" direction="column">
						<Typography color="textSecondary">
							Немає повідомлень
						</Typography>
					</Grid>
				</ListItem>}
		</List>
	);
}