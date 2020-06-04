import { getStudentById, students } from '../students/index';

export enum MessageType {
	text = "text",
	variantSingle = "variant_single",
	variantMultiple = "variant_multiple",
}

export interface IMessageDataText {
	text: string;
}

export interface IMessage {
	id: number;
	type: MessageType;
	data: IMessageDataText;
}

export const createTextMessage = (() => {
	let id = 0;
	return (user, text) => {
		const createDate = new Date();
		const createDateString = createDate.toISOString();
		const [ date, other ] = createDateString.split("T");
		const [ time, ...rest ] = other.split(".");
		return {
			id: ++id,
			firstName: user.firstName,
			lastName: user.lastName,
			time: time.split(':').splice(0, 2).join(':'),
			date: date,
			type: MessageType.text,

			from: user,
			data: {
				text,
			}
		}
	}
})();

const groupChats: Record<number, IMessage[]> = {
	1: [
		createTextMessage(students[0], "Сьогодні захист дипломного проекту, хто піде в армію?"),
		createTextMessage(students[0], "Привіт всім!"),
	],
};
const studentChats: Record<number, IMessage[]> = {};
const subjectChats: Record<number, IMessage[]> = {};

const chats = {
	group: groupChats,
	student: studentChats,
	subject: subjectChats,
};

export const getChatMessages = async (chatType, chatId) => {
	if (!chats[chatType][chatId]) chats[chatType][chatId] = [];
	return chats[chatType][chatId];
}

export const addChatMessage = async (chatType: string, chatId: number, message: IMessage) => {
	if (!chats[chatType][chatId]) chats[chatType][chatId] = [];
	chats[chatType][chatId].unshift(message);
}

export const addChatMessageText = async (chatType: string, chatId: number, userId: number, text: string) => {
	const user = await getStudentById(userId);
	const newMessage = createTextMessage(user, text);
	await addChatMessage(chatType, chatId, newMessage);
	return newMessage;
}