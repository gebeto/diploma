import * as React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';


export const MessageItemText = (props: { message: any }) => {
	console.log(props.message);
	return (
		<ListItem>
			<ListItemAvatar>
				<Avatar src={props.message.from.avatar} />
			</ListItemAvatar>
			<ListItemText primary={`${props.message.from.firstName} ${props.message.from.lastName}`} secondary={props.message.data.text} />
			<ListItemSecondaryAction>
				<Typography variant="overline" color="textSecondary">{props.message.time}</Typography>
			</ListItemSecondaryAction>
		</ListItem>
	);
}
