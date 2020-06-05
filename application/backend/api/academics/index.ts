import * as Router from 'koa-router';

import { getAcademics, addAcademic, updateAcademic } from '../../services/academics/index';


const academicsRouter = new Router({ prefix: "/academics" });

academicsRouter.post('/get', async (ctx, next) => {
	ctx.body = {
		items: await getAcademics(),
	};
	await next();
});

academicsRouter.post('/add', async (ctx, next) => {
	ctx.body = {
		item: await addAcademic(ctx.request.body),
	};
	await next();
});

academicsRouter.post('/update', async (ctx, next) => {
	ctx.body = {
		item: await updateAcademic(ctx.request.body),
	};
	await next();
});


export default academicsRouter;
