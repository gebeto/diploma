import * as React from 'react';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import { MessageItemText } from './MessageItemText';
import { MessageItemVariant } from './MessageItemVariant';

const components = {
	default: MessageItemText,
	variant: MessageItemVariant,
	text: MessageItemText,
}


const useStyles = makeStyles((theme: Theme) =>
	createStyles({
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
		messageItem: {
			marginTop: isStacked => isStacked ? '0px' : '8px',
			paddingTop: isStacked => isStacked ? '0px' : undefined,
			borderRadius: '5px',
			backgroundColor: theme.palette.background.paper,
			'&:first-child': {
				marginTop: 0,
			}
		},
		messageItemText: {
			marginTop: isStacked => isStacked ? '0px' : undefined,
		}
	}),
);


export const MessageItem = (props) => {
	const MessageComponent = components[props.message.type] || components.default;
	const classes = useStyles(props.stacked);

	return (
		<ListItem className={classes.messageItem}>
			<ListItemText className={classes.messageItemText}>
				{props.stacked ? null : <Grid container>
					<Grid item className={classes.avatar}>
						<Avatar src={props.message.from.avatar} />
					</Grid>
					<Grid item className={classes.titleAndTime}>
						<Typography variant="body1" component="div" className={classes.author}>
							{props.message.from.firstName} {props.message.from.lastName}
						</Typography>
						<Typography className={classes.time} variant="overline" color="textSecondary">{props.message.time}</Typography>
					</Grid>
				</Grid>}
				<MessageComponent message={props.message} />
			</ListItemText>
		</ListItem>
	);
}
