import * as Router from 'koa-router';

import { getSchedule, getNextScheduleDay } from '../../services/schedule/index';


const scheduleRouter = new Router({ prefix: "/schedule" });

scheduleRouter.post('/get', async (ctx, next) => {
	ctx.body = {
		items: await getSchedule(),
	};
	await next();
});


scheduleRouter.post('/getNextDay', async (ctx, next) => {
	ctx.body = {
		item: await getNextScheduleDay(),
	};
	await next();
});


export default scheduleRouter;
