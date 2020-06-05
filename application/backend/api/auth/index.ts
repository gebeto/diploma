import * as Router from 'koa-router';
import * as jwt from 'jsonwebtoken';

import { generateTokenForStudent } from '../../services/auth/index';


const authRouter = new Router({ prefix: "/auth" });

authRouter.post('/login', async (ctx, next) => {
	const token = await generateTokenForStudent(ctx.request.body.email, ctx.request.body.password);

	ctx.assert(token, 404);
	
	ctx.body = {
		"token": token,
	};

	await next();
});

export default authRouter;
