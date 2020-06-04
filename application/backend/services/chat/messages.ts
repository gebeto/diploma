import { getStudentById, students } from '../students/index';
import { getVariantsById, createVariants } from './variants';

export enum MessageType {
	text = "text",
	variant = "variant",
	variantMultiple = "variantMultiple",
}

export interface IMessageDataText {
	text: string;
}

export interface IMessage {
	id: number;
	type: MessageType;
	data: IMessageDataText;
}

export const createMessage = (() => {
	let id = 0;
	return (user, message) => {
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

			from: user,

			...message,
		}
	}
})();

const createMessageText = (text) => {
	return {
		type: MessageType.text,
		data: {
			text
		}
	}
}

const createMessageVariants = (id: number, title: string) => {
	return {
		type: MessageType.variant,
		data: {
			id: id,
			title: title,
		}
	}
}

const groupChats: Record<number, IMessage[]> = {
	1: [
		createMessage(students[0], createMessageText("Сьогодні захист дипломного проекту, хто піде в армію?")),
		createMessage(students[0], createMessageText("Привіт всім!")),
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
	const newMessage = createMessage(user, createMessageText(text));
	await addChatMessage(chatType, chatId, newMessage);
	return newMessage;
}

export const addChatMessageVariants = async (chatType: string, chatId: number, userId: number, title: string, variants: any[]) => {
	const user = await getStudentById(userId);
	const newVariants = await createVariants(title, variants);
	const newMessage = createMessage(user, createMessageVariants(newVariants.id, newVariants.title));
	await addChatMessage(chatType, chatId, newMessage);
	return newMessage;
}