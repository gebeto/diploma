import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import { ChatsLink, ChatLink } from './ChatsLink';

test("ChatLink is rendering without errors", () => {
	const chatLink = render(
		<MemoryRouter>
			<ChatLink chatId="111" title="ChatLinkTitle" />
		</MemoryRouter>
	);
	expect(chatLink.getByText("ChatLinkTitle")).toBeInTheDocument();
});

test("ChatsLink is rendering without errors", () => {
	const chatsLink = render(
		<MemoryRouter>
			<ChatsLink />
		</MemoryRouter>
	);
	expect(chatsLink.getByText("Чати")).toBeInTheDocument();
});