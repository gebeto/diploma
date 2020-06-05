import { getChatInfo } from './chats';


test("Chat info for group", async () => {
	const info = await getChatInfo("group", 1);
	expect(info.title).toBe("Загальний");
});

test("Chat info for student", async () => {
	const info = await getChatInfo("student", 1);
	expect(info).not.toBe(null);
});

test("Chat info for subject", async () => {
	const info = await getChatInfo("subject", 1);
	expect(info.title).toBe("Основи програмування");
});

test("Chat info for unknown type", async () => {
	const info = await getChatInfo("any", 1);
	expect(info).toBe(undefined);
});
