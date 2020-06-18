import * as Router from 'koa-router';
import * as jwt from 'jsonwebtoken';

import { getStudentByEmailAndPassword } from '../../services/students/index';
import { generateTokenForStudent, generateTokenForStudentEmailPassword } from '../../services/auth/index';


const authRouter = new Router({ prefix: "/auth" });

authRouter.post('/login', async (ctx, next) => {
	const student = await getStudentByEmailAndPassword(ctx.request.body.email, ctx.request.body.password);
	
	if (student === undefined) {
		ctx.body = {
			error: {
				fields: {
					email: "Такого користувача не знайдено",
				}
			}
		}
		return;
	}

	if (student === null) {
		ctx.body = {
			error: {
				fields: {
					password: "Невірний пароль",
				}
			}
		}
		return;
	}

	const token = await generateTokenForStudent(student);

	ctx.assert(token, 404);
	
	ctx.body = {
		"token": token,
		"user": {
			id: student.id,
			firstName: student.firstName,
			middleName: student.middleName,
			lastName: student.lastName,
			avatar: student.avatar,
			email: student.email,
			phone: student.phone,
		}
	};

	await next();
});

export default authRouter;
