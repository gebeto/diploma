import * as React from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import { NavLink } from "react-router-dom";


export const ExpandIcon = (props: { expanded: boolean; }) => (props.expanded ? <ExpandLess /> : <ExpandMore />);

export const ChatLink = (props: { chatId: string; title: string; className?: string; onClick?: any; }) => (
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