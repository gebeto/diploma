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

import { MessageItem } from './MessageItem/'

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: '100%',
		},
		marginTopABit: {
			// marginTop: '4px',
			marginTop: '8px',
			borderRadius: '5px',
			backgroundColor: theme.palette.background.paper,
			'&:first-child': {
				marginTop: 0,
			}
		},
		author: {
			fontWeight: 500,
			[theme.breakpoints.down('xs')]: {
				fontWeight: 700,
			},
		},
		avatar: {
			marginRight: theme.spacing(2),
			marginBottom: theme.spacing(1),
		},
		titleAndTime: {
			display: 'flex',
			flexDirection: 'column',
		},
		time: {
			lineHeight: '1',
		},
	}),
);

export const MessagesList = (props) => {
	const classes = useStyles();

	if (props.messages.state.isFetching) {
		return (
			<List className={classes.root}>
				<ListItem>
					<Grid container justify="center" alignItems="center" direction="column">
						<CircularProgress />
					</Grid>
				</ListItem>
			</List>
		);
	}

	if (props.messages.state.isFetchingError) {
		return (
			<List className={classes.root}>
				<ListItem>
					<Grid container justify="center" alignItems="center" direction="column">
						Помилка завантаження!
						<Button color="primary" onClick={props.messages.refetch}>Спробувати знову</Button>
					</Grid>
				</ListItem>
			</List>
		);
	}

	return (
		<List className={classes.root}>
			{props.messages.state.response.messages.length ? props.messages.state.response.messages.map(message =>
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