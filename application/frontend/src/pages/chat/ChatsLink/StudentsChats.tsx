import * as React from 'react';

import { ChatsGroup } from './ChatsGroup';


export const StudentsChats = (props) => {
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
