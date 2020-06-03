import * as Router from 'koa-router';

import { getChats, addChat, getChatMessages, addChatMessageText } from '../../services/chat/index';


const studentsRouter = new Router({ prefix: "/chat" });

studentsRouter.post('/getChats', async (ctx, next) => {
	ctx.body = {
		items: await getChats(),
	};
	await next();
});

studentsRouter.post('/getChatMessages', async (ctx, next) => {
	ctx.body = {
		items: await getChatMessages(ctx.request.body.chatId),
	};
	await next();
});


export default studentsRouter;
