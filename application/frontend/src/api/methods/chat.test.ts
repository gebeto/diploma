import { API, ApiClient } from '../utils/ApiClient';

import {
	chatsSubjectsGet,
	chatsStudentsGet,
	chatsGetMessages,
	chatAddMessage,
	chatAddMessageVariants,
	chatGetVariants,
	chatVariantMark,
} from './chat';

beforeAll(() => {
	API.PREFIX = "http://localhost:8000/api"
});

test("chatsSubjectsGet should be authorized", async () => {
	expect(chatsSubjectsGet({} as any)).rejects;
});

test("chatsStudentsGet should be authorized", async () => {
	expect(chatsStudentsGet({} as any)).rejects;
});

test("chatsGetMessages should be authorized", async () => {
	expect(chatsGetMessages({} as any)).rejects;
});

test("chatAddMessage should be authorized", async () => {
	expect(chatAddMessage({} as any)).rejects;
});

test("chatAddMessageVariants should be authorized", async () => {
	expect(chatAddMessageVariants({} as any)).rejects;
});

test("chatGetVariants should be authorized", async () => {
	expect(chatGetVariants({} as any)).rejects;
});

test("chatVariantMark should be authorized", async () => {
	expect(chatVariantMark({} as any)).rejects;
});
