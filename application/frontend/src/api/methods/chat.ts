import { API_POST, ResponseAll } from "../utils";


export const chatsGet = (data: {}) => API_POST<ResponseAll<any>>(`/chat/getChats`, data);
export const chatsGetMessages = (data: { chatId: number; }) => API_POST<ResponseAll<any>>(`/chat/getChatMessages`, data);
