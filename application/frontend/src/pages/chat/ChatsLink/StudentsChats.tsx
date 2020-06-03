import * as React from 'react';

import { chatsStudentsGet } from '../../../api/';
import { makeApiRequest } from '../../../api/utils';

import { ChatsGroup } from './ChatsGroup';


const useChatsGetRequest = makeApiRequest(async () => {
	const result = await chatsStudentsGet({});
	return result.items;
});


export const StudentsChats = (props) => {
	const chats = useChatsGetRequest();
	return (
		<ChatsGroup
			onClick={props.onClick}
			classes={props.classes}
			title="Студенти"
			chats={chats.state.response}
			chatIdPrefix="student"
		/>
	);
}
