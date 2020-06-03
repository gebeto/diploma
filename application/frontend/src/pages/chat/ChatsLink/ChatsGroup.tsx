import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';

import { ChatLink, ExpandIcon } from './ChatLink';


export const ChatsGroup = (props: { title: string; classes: any; onClick: any; chats: any[]; chatIdPrefix: string; }) => {
	const [ open, setOpen ] = React.useState(false);

	const toggleOpen = React.useCallback(() => {
		setOpen(!open);
	}, [open]);

	return (
		<List component="div" disablePadding subheader={
			<ListSubheader onClick={toggleOpen} className={props.classes.nested}>
				<Grid container justify="space-between" alignItems="center">
					{props.title}
					<ExpandIcon expanded={open} />
				</Grid>
			</ListSubheader>
		}>
			<Collapse in={open} timeout="auto" unmountOnExit>
				{props.chats.map(chat =>
					<ChatLink key={chat.id} title={chat.title} chatId={`${props.chatIdPrefix}-${chat.id}`} onClick={props.onClick} className={props.classes.nested2} />
				)}
			</Collapse>
		</List>
	);
}

ChatsGroup.defaultProps = {
	chats: [],
};