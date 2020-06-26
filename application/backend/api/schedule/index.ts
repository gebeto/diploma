import * as Router from 'koa-router';

import {
	getSchedule, getNextScheduleDay,
	academics, subjects, pavilions, subjectTypes,
} from '../../services/schedule/index';

import { createSchedule } from '../../services/schedule/ics';


const scheduleRouter = new Router({ prefix: "/schedule" });

scheduleRouter.post('/get', async (ctx, next) => {
	ctx.body = {
		schedule: await getSchedule(),

		academics, subjects, pavilions, subjectTypes
	};
	await next();
});


scheduleRouter.post('/getNextDay', async (ctx, next) => {
	const lessonsAll = await getSchedule();
	const lessons = lessonsAll;
	ctx.body = {
		schedule: lessons,
		academics, subjects, pavilions, subjectTypes
	};
	await next();
});


scheduleRouter.post('/update-lesson', async (ctx, next) => {
	const item = (await getSchedule()).find(i => i.id === ctx.request.body.id);

	item.classroom = ctx.request.body.classroom;
	item.order = Number(ctx.request.body.order);
	item.date = new Date(ctx.request.body.date);
	item.type = Number(ctx.request.body.type);

	ctx.body = {
		success: true,
		item: item,
	};
	await next();
});


scheduleRouter.get('/schedule.ics', async (ctx, next) => {
	const sched = await getSchedule();
	ctx.body = createSchedule("ПЗ-41з", sched);
	ctx.type = "text/calendar";
});


export default scheduleRouter;
