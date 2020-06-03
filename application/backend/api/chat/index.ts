import * as Router from 'koa-router';

import { getChats, getSubjectsChats, getStudentsChats, getChatMessages, addChatMessageText } from '../../services/chat/index';


const studentsRouter = new Router({ prefix: "/chat" });


studentsRouter.post('/getSubjectsChats', async (ctx, next) => {
	ctx.body = {
		items: await getSubjectsChats(),
	};
	await next();
});

studentsRouter.post('/getStudentsChats', async (ctx, next) => {
	ctx.body = {
		items: await getStudentsChats(),
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
