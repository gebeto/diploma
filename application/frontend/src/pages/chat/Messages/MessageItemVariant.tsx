import * as React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';


import Checkbox from '@material-ui/core/Checkbox';

export const VariantsSelectModal = () => {
	return 
}


export const MessageItemVariant = (props: { message: any }) => {
	
	return (
		<ListItem>
			<ListItemAvatar>
				<Avatar src={props.message.from.avatar} />
			</ListItemAvatar>
			<ListItemText component={Paper}>
				<Typography variant="body1">
					{props.message.data.title}
					<br />
					<Button size="small" color="primary">Обрати варіант</Button>
				</Typography>
				<Typography component="ul" variant="body2">
						{props.message.data.variants.map(item =>
							<li key={item.title}>
								{item.by ? <strike>{item.title}</strike> : item.title}
							</li>
						)}
				</Typography>
			</ListItemText>
			<ListItemSecondaryAction>
				<Typography variant="overline" color="textSecondary">{props.message.time}</Typography>
			</ListItemSecondaryAction>
		</ListItem>
	);
}
