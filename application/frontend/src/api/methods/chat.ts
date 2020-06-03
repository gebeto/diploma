import { API_POST, ResponseAll } from "../utils";


export const chatsSubjectsGet = (data: {}) => API_POST<ResponseAll<any>>(`/chat/getSubjectsChats`, data);
export const chatsStudentsGet = (data: {}) => API_POST<ResponseAll<any>>(`/chat/getStudentsChats`, data);
export const chatsGetMessages = (data: { chatId: number; }) => API_POST<ResponseAll<any>>(`/chat/getChatMessages`, data);
