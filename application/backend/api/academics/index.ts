import * as Router from 'koa-router';

import { getAcademics } from '../../services/academics/index';


const academicsRouter = new Router({ prefix: "/academics" });

academicsRouter.post('/get', async (ctx, next) => {
	ctx.body = {
		items: await getAcademics(),
	};
	await next();
});


export default academicsRouter;
