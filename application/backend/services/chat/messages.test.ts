import { getChatMessages, addChatMessageText } from './messages';


test("Default messasges is 2", async () => {
	const messages = await getChatMessages("group", 1);
	expect(messages.length).toBe(2);
});

test("Add new message returns new message with id and data", async () => {
	const newMessage = await addChatMessageText("group", 1, 1, "Hello world!");
	expect(newMessage.data.text).toBe("Hello world!");
	expect(newMessage.id).toBe(3);
});

test("Messages count will be 3 after add new message", async () => {
	const messages = await getChatMessages("group", 1);
	expect(messages.length).toBe(3);
});
