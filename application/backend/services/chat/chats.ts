const chats = [];
const chatsSubjects = [];
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

createChat(chats, "Загальний");
createChat(chatsSubjects, "Основи компютерних мереж");
createChat(chatsSubjects, "Охорона праці");
createChat(chatsStudents, "Стів Джобс");
createChat(chatsStudents, "Біл Ґєйц");

export const getChats = async () => {
	return chats;
}

export const addChat = async (chatTitle) => {
	return createChat(chats, chatTitle);
}


export const getSubjectsChats = async () => {
	return chatsSubjects;
}

export const getStudentsChats = async () => {
	return chatsStudents;
}

export const addSubjectChat = async (chatTitle) => {
	return createChat(chatsSubjects, chatTitle);
}
