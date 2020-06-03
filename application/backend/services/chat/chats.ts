const chats = [];

const createChat = (() => {
	let id = 0;
	return (title) => {
		const newChat = {
			id: ++id,
			title: title,
		};
		chats.push(newChat);
		return newChat;
	}
})();

createChat("Hello world!");

export const getChats = async () => {
	return chats;
}

export const addChat = async (chatTitle) => {
	return createChat(chatTitle);
}