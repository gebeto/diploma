import * as Koa from 'koa';
import * as logger from 'koa-logger';
import * as json from 'koa-json';
import * as bodyParser from 'koa-bodyparser';
import * as jwt from 'koa-jwt';

import * as http from 'http';
import { Server } from "socket.io";

import { SECRET_KEY, PORT } from './config';

import ApiRouter from './api/index';

import { decodeToken } from './services/auth/index';


const app = new Koa();

const server = http.createServer(app.callback())
const io = new Server(server, {
	// transports: ["polling", "websocket"],
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
		allowedHeaders: ["my-custom-header"],
		credentials: true
	}
});


// Configure koa
app.use(logger());
app.use(json());
app.use(bodyParser());


// Configure JWT
app.use(
	jwt({
		secret: SECRET_KEY,
	})
	.unless({
		path: [/^\/api\/auth/, "/", "/api/schedule/schedule.ics"]
	})
);


// Configure socket.io
io.on('connection', async (socket) => {
	socket.emit('auth');

	socket.on('auth', async (token) => {
		try {
			const decoded: any = await decodeToken(token);
			if (!decoded) {
				throw new Error("Bad token");
			}
			socket.join(`group-${decoded.groupId}`);
		} catch(err) {
			socket.disconnect(true);
			console.error(err);
			return;
		}
	});

	socket.on('disconnect', async () => {});
});

app.use(async (ctx, next) => {
	if (ctx.state.user !== undefined) {
		ctx.io = io.to(`group-${ctx.state.user.groupId}`);
	}
	await next();
});


// Configure errors handling
app.use(async (ctx, next) => {
	try {
		await next();
	} catch (err) {
		ctx.status = err.status || 500;
		ctx.body = {
			error: err.message,
			status: ctx.status,
		};
	}
});


// Apply routes
app.use(ApiRouter.routes()).use(ApiRouter.allowedMethods());


// Run server
server.listen(PORT, () => {
	console.log("App is started.");
});
