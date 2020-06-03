import * as Router from 'koa-router';

// import { getChats, getSubjectsChats, getStudentsChats, getChatMessages, addChatMessageText } from '../../services/chat/index';
import { getChatMessages } from '../../services/chat/index';
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
	ctx.body = {
		items: await getChatMessages(ctx.request.body.chatId),
	};
	await next();
});


export default studentsRouter;
