import * as Router from 'koa-router';

import { getSchedule } from '../../services/schedule/index';


const scheduleRouter = new Router({ prefix: "/schedule" });

scheduleRouter.post('/get', async (ctx, next) => {
	ctx.body = {
		items: await getSchedule(),
	};
	await next();
});


export default scheduleRouter;
