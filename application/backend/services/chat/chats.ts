const chats = [];
const chatsStudents = [];

const createChat = (() => {
	let id = 0;
	return (chats, title) => {
		const newChat = {
			id: ++id,
			title: title,
		};
		chats.push(newChat);
		return newChat;
	}
})();

export const a = 1;

// createChat(chats, "Загальний");
// createChat(chatsStudents, "Стів Джобс");
// createChat(chatsStudents, "Біл Ґєйц");

// export const getChats = async () => {
// 	return chats;
// }

// export const addChat = async (chatTitle) => {
// 	return createChat(chats, chatTitle);
// }


// export const getSubjectsChats = async () => {
// 	return chatsSubjects;
// }

// export const getStudentsChats = async () => {
// 	return chatsStudents;
// }
