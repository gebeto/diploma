import * as React from 'react';

import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
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

export const MessageItem1 = (props) => {
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



export const MessageItem2 = (props) => {
	const MessageComponent = components[props.message.type] || components.default;



	return (
		<ListItem className={props.classes.marginTopABit}>
			<ListItemText>
				<Grid container>
					<Grid item className={props.classes.avatar}>
						<Avatar src={props.message.from.avatar} />
					</Grid>
					<Grid item className={props.classes.titleAndTime}>
						<Typography variant="body1" component="div" className={props.classes.author}>
							{props.message.from.firstName} {props.message.from.lastName}
						</Typography>
						<Typography className={props.classes.time} variant="overline" color="textSecondary">{props.message.time}</Typography>
					</Grid>
				</Grid>
				<MessageComponent message={props.message} />
			</ListItemText>
		</ListItem>
	);
}


export const MessageItem = MessageItem2;
