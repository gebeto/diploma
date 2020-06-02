import * as Router from 'koa-router';

// const apiRouter = new Router({ prefix: "/api" });
const apiRouter = new Router();


apiRouter.get('/', async (ctx, next) => {
	ctx.body = { title: "API ROOT" };
	await next();
});


apiRouter.get('/info', async (ctx, next) => {
	ctx.body = ctx.state;
	console.log("INFO!!!!!");
	await next();
});


const applyRoute = (name) => {
	const router = require(`./${name}/`);
	apiRouter
		.use(router.default.routes())
		.use(router.default.allowedMethods());
}


applyRoute('student');
applyRoute('schedule');
applyRoute('auth');


export default apiRouter;
