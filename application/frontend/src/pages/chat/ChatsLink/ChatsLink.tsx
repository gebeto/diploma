import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import ChatIcon from '@material-ui/icons/Chat';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';

import { NavLink } from "react-router-dom";

import { ChatLink, ExpandIcon } from './ChatLink';
import { ChatsGroup } from './ChatsGroup';
import { SubjectsChats } from './SubjectsChats';
import { StudentsChats } from './StudentsChats';

const useStylesChatLink = makeStyles((theme: Theme) =>
	createStyles({
		nested: {
			paddingLeft: theme.spacing(4),
		},
		nested2: {
			paddingLeft: theme.spacing(5),
		},
	}),
);

export const ChatsLink = (props) => {
	const classes = useStylesChatLink();
	const [ open, setOpen ] = React.useState(false);

	const toggleChatsOpen = React.useCallback(() => {
		setOpen(!open)
	}, [open])

	return (
		<React.Fragment>
			<ListItem button onClick={toggleChatsOpen}>
				<ListItemIcon>
					<Badge badgeContent={0} color="secondary">
						<ChatIcon />
					</Badge>
				</ListItemIcon>
				<ListItemText primary="Чати" />
				<ExpandIcon expanded={open} />
			</ListItem>
			<Collapse in={open} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					<ChatLink title="Загальний" chatId={1} onClick={props.onClick} className={classes.nested} />
				</List>
				<SubjectsChats onClick={props.onClick} classes={classes} />
				<StudentsChats onClick={props.onClick} classes={classes} />
			</Collapse>
		</React.Fragment>
	)
};
