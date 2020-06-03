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
	return (userId, text) => {
		return {
			id: ++id,
			userId: userId,
			type: MessageType.text,
			data: {
				text,
			}
		}
	}
})();

const messages: Record<number, IMessage[]> = {
	1: [
		createTextMessage(1, "Привіт всім!"),
		createTextMessage(1, "Сьогодні захист дипломного проекту, хто піде в армію?"),
	],
};

export const getChatMessages = async (chatId) => {
	return messages[chatId];
}

export const addChatMessage = async (chatId: number, message: IMessage) => {
	if (!messages[chatId]) messages[chatId] = [];
	messages[chatId].unshift(message);
}

export const addChatMessageText = async (chatId: number, userId: number, text: string) => {
	const newMessage = createTextMessage(userId, text);
	await addChatMessage(chatId, newMessage);
	return newMessage;
}