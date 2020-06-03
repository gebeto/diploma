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
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';

import { NavLink } from "react-router-dom";

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

export const ChatLink = (props: { chatId: number; title: string; className?: string; onClick?: any; }) => (
	<ListItem
		button
		onClick={props.onClick}
		className={props.className}
		component={NavLink}
		activeClassName="Mui-selected"
		to={`/chat/${props.chatId}`}
		exact
	>
		<ListItemText primary={props.title} />
	</ListItem>
);

const ChatsGroup = (props: { title: string; classes: any; onClick: any; chats: any[]; }) => {
	const [ open, setOpen ] = React.useState(false);

	const toggleOpen = React.useCallback(() => {
		setOpen(!open);
	}, [open]);

	return (
		<List component="div" disablePadding subheader={
			<ListSubheader onClick={toggleOpen} className={props.classes.nested}>
				<Grid container justify="space-between" alignItems="center">
					{props.title}
					{open ? <ExpandLess /> : <ExpandMore />}
				</Grid>
			</ListSubheader>
		}>
			<Collapse in={open} timeout="auto" unmountOnExit>
				{props.chats.map(chat =>
					<ChatLink key={chat.id} title={chat.title} chatId={chat.id} onClick={props.onClick} className={props.classes.nested2} />
				)}
			</Collapse>
		</List>
	);
}

const SubjectsChats = (props) => {
	const chats = React.useMemo(() => ([
		{id: 2, title: "Основи компютерних мереж"},
		{id: 3, title: "Охорона праці"},
	]), []);
	return (
		<ChatsGroup
			onClick={props.onClick}
			classes={props.classes}
			title="Предмети"
			chats={chats}
		/>
	);
}

const StudentsChats = (props) => {
	const chats = React.useMemo(() => ([
		{id: 21, title: "Біл Ґейц"},
		{id: 32, title: "Стів Джобс"},
	]), []);
	return (
		<ChatsGroup
			onClick={props.onClick}
			classes={props.classes}
			title="Студенти"
			chats={chats}
		/>
	);
}

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
				{open ? <ExpandLess /> : <ExpandMore />}
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
