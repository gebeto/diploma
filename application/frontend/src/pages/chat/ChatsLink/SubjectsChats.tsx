import * as React from 'react';

import { ChatsGroup } from './ChatsGroup';


export const SubjectsChats = (props) => {
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
