import * as Router from 'koa-router';

import { getStudents } from '../../services/students/index';


const studentsRouter = new Router({ prefix: "/students" });

studentsRouter.post('/get', async (ctx, next) => {
	ctx.body = {
		items: await getStudents(),
	};
	await next();
});


export default studentsRouter;
