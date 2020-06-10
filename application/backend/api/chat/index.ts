import * as Router from 'koa-router';

// import { getChats, getSubjectsChats, getStudentsChats, getChatMessages, addChatMessageText } from '../../services/chat/index';
import { getChatInfo, getChatMessages, addChatMessageText, addChatMessageVariants, getVariantsById, getVariants } from '../../services/chat/index';
import { getSubjects } from '../../services/schedule/subjects';
import { getStudents, getStudentById } from '../../services/students/index';


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
		const message = await addChatMessageText(chatType, Number(chatId), ctx.state.user.id, ctx.request.body.text);
		ctx.body = {
			success: true,
		};
		(ctx as any).io.emit(`message ${chatTypeWithId}`, message);
	} else {
		return;
	}

	await next();
});

studentsRouter.post('/addChatMessageVariants', async (ctx, next) => {
	const chatTypeWithId = ctx.request.body.chatId;
	if (!chatTypeWithId) return;

	const [ full, chatType, chatId ] = /([\w\W]+?)-(\d+)/.exec(chatTypeWithId);

	if (chatType && chatId) {
		const message = await addChatMessageVariants(chatType, Number(chatId), ctx.state.user.id, ctx.request.body.title, ctx.request.body.variants);
		ctx.body = {
			success: true,
		};
		(ctx as any).io.emit(`message ${chatTypeWithId}`, message);
	} else {
		return;
	}

	await next();
});


studentsRouter.post('/getVariants', async (ctx, next) => {
	const variantsId = ctx.request.body.variantsId;
	if (!variantsId) return;
	const variants = await getVariantsById(variantsId);
	if (!variants) return;

	ctx.body = {
		item: variants,
	};

	await next();
});


studentsRouter.post('/markVariantsVariant', async (ctx, next) => {
	const b = ctx.request.body;
	const userId = ctx.state.user.id;
	const variantsId = b.variantsId;
	const variantId = b.variantId;
	if (!userId || !variantsId || !variantId) return;

	const variants = await getVariantsById(variantsId);
	if (!variants) return;

	const user = await getStudentById(userId);
	if (!user) return;

	variants.variants.forEach(v => {
		if (v.id === variantId) {
			v.selectedBy = user;
		} else if (v.selectedBy && v.selectedBy.id === userId) {
			delete v.selectedBy;
		}
	})

	ctx.body = {
		success: true,
		item: variants,
	};

	(ctx as any).io.emit(`variants ${variantsId}`, variants);

	await next();
});


export default studentsRouter;
