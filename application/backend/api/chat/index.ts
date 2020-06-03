import * as Router from 'koa-router';

// import { getChats, getSubjectsChats, getStudentsChats, getChatMessages, addChatMessageText } from '../../services/chat/index';
import { getChatInfo, getChatMessages, addChatMessageText } from '../../services/chat/index';
import { getSubjects } from '../../services/schedule/subjects';
import { getStudents } from '../../services/students/index';


const studentsRouter = new Router({ prefix: "/chat" });


studentsRouter.post('/getSubjectsChats', async (ctx, next) => {
	ctx.body = {
		items: await getSubjects(),
	};
	await next();
});

studentsRouter.post('/getStudentsChats', async (ctx, next) => {
	ctx.body = {
		items: await getStudents().then(students => students.map(stud => ({ id: stud.id, title: `${stud.firstName} ${stud.lastName}` }))),
	};
	await next();
});

studentsRouter.post('/getChatMessages', async (ctx, next) => {
	const chatTypeWithId = ctx.request.body.chatId;
	if (!chatTypeWithId) return;

	const [ full, chatType, chatId ] = /([\w\W]+?)-(\d+)/.exec(chatTypeWithId);

	if (chatType && chatId) {
		ctx.body = {
			chat: await getChatInfo(chatType, Number(chatId)),
			messages: await getChatMessages(chatType, Number(chatId)),
		};
	} else {
		return;
	}

	await next();
});

studentsRouter.post('/addChatMessage', async (ctx, next) => {
	const chatTypeWithId = ctx.request.body.chatId;
	if (!chatTypeWithId) return;

	const [ full, chatType, chatId ] = /([\w\W]+?)-(\d+)/.exec(chatTypeWithId);

	if (chatType && chatId) {
		ctx.body = {
			success: true,
			item: await addChatMessageText(chatType, Number(chatId), ctx.request.body.userId, ctx.request.body.text),
		};
	} else {
		return;
	}

	await next();
});


export default studentsRouter;
