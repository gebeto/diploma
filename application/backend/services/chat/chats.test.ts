import { getChats, addChat } from './chats';


test("One chat by default", async () => {
	const chats = await getChats();
	expect(chats.length).toBe(1);
});

test("addChat returns chat object", async () => {
	const newChat = await addChat("Test");
	expect(newChat.title).toBe("Test");
});

test("Two chats after adding new chat", async () => {
	const chats = await getChats();
	expect(chats.length).toBe(2);
});