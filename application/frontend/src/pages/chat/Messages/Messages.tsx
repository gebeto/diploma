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

import { MessageItemText } from './MessageItemText';
import { MessageItemVariant } from './MessageItemVariant';

const components = {
	default: MessageItemText,
	variant: MessageItemVariant,
	text: MessageItemText,
}

const MessageItem = (props) => {
	const MessageComponent = components[props.message.type] || components.default;

	return (
		<ListItem className={props.classes.marginTopABit}>
			<ListItemAvatar>
				<Avatar src={props.message.from.avatar} />
			</ListItemAvatar>
			<ListItemText>
				<Typography variant="body1" component="div" className={props.classes.bold}>
					{props.message.from.firstName} {props.message.from.lastName}
				</Typography>
				<MessageComponent message={props.message} />
			</ListItemText>
			<ListItemSecondaryAction>
				<Typography variant="overline" color="textSecondary">{props.message.time}</Typography>
			</ListItemSecondaryAction>
		</ListItem>
	);
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: '100%',
			// backgroundColor: 'red',
		},
		bold: {
			fontWeight: 500,
			[theme.breakpoints.down('xs')]: {
				fontWeight: 700,
			},
		},
		marginTopABit: {
			marginTop: '4px',
			borderRadius: '5px',
			backgroundColor: theme.palette.background.paper,
		}
	}),
);

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
				<MessageItem classes={classes} key={message.id} message={message} />
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