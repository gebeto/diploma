import * as Router from 'koa-router';

import {
	getSchedule, getNextScheduleDay,
	academics, subjects, pavilions, subjectTypes,
} from '../../services/schedule/index';


const scheduleRouter = new Router({ prefix: "/schedule" });

scheduleRouter.post('/get', async (ctx, next) => {
	ctx.body = {
		schedule: await getSchedule(),

		academics, subjects, pavilions, subjectTypes
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
