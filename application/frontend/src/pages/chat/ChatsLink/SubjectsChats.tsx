import * as React from 'react';

import { chatsSubjectsGet } from '../../../api/';
import { makeApiRequest } from '../../../api/utils';

import { ChatsGroup } from './ChatsGroup';


const useChatsGetRequest = makeApiRequest(async () => {
	const result = await chatsSubjectsGet({});
	return result.items;
});


export const SubjectsChats = (props) => {
	const chats = useChatsGetRequest();
	return (
		<ChatsGroup
			onClick={props.onClick}
			classes={props.classes}
			title="Предмети"
			chats={chats.state.response}
		/>
	);
}
