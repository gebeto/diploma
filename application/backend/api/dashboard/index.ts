import * as Router from 'koa-router';

import { getNextScheduleDay } from '../../services/schedule/index';


const dashboardRouter = new Router({ prefix: "/dashboard" });

dashboardRouter.post('/get', async (ctx, next) => {
	ctx.body = {
		items: await getNextScheduleDay(),
	};
	await next();
});


export default dashboardRouter;
