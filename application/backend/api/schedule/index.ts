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


scheduleRouter.post('/update-lesson', async (ctx, next) => {
	const item = (await getSchedule()).find(i => i.id === ctx.request.body.id);

	item.classroom = ctx.request.body.classroom;
	item.order = Number(ctx.request.body.order);
	item.date = ctx.request.body.date;
	item.type = Number(ctx.request.body.type);

	ctx.body = {
		success: true,
		item: item,
	};
	await next();
});


export default scheduleRouter;
