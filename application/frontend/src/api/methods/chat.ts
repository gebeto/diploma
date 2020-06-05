import { API_POST, ResponseAll, ResponseOne } from "../utils";


export const chatsSubjectsGet = (data: {}) => API_POST<ResponseAll<any>>(`/chat/getSubjectsChats`, data);
export const chatsStudentsGet = (data: {}) => API_POST<ResponseAll<any>>(`/chat/getStudentsChats`, data);
export const chatsGetMessages = (data: { chatId: string; }) => API_POST<ResponseAll<any>>(`/chat/getChatMessages`, data);
export const chatAddMessage = (data: { chatId: string; text: string; }) => API_POST<ResponseOne<any>>(`/chat/addChatMessage`, data);
export const chatAddMessageVariants = (data: { chatId: string; title: string; variants: any[]; }) => API_POST<ResponseOne<any>>(`/chat/addChatMessageVariants`, data);
export const chatGetVariants = (data: { variantsId: number; }) => API_POST<ResponseOne<any>>(`/chat/getVariants`, data);
export const chatVariantMark = (data: { variantsId: number; variantId: number; }) => API_POST<ResponseOne<any>>(`/chat/markVariantsVariant`, data);
