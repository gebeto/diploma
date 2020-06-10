import * as Koa from 'koa';
import * as logger from 'koa-logger';
import * as json from 'koa-json';
import * as bodyParser from 'koa-bodyparser';
import * as jwt from 'koa-jwt';

import * as http from 'http';
import * as socket from 'socket.io';

import { SECRET_KEY, PORT } from './config';

import ApiRouter from './api/';


const app = new Koa();

const server = http.createServer(app.callback())
const io = socket(server);

io.on('connection', function(socket){
	// console.log('a user connected');
	// socket.broadcast.emit('type', msg);
	// io.emit('type', msg);
	socket.on('disconnect', () => {
		// console.log('user disconnected');
	});
});

app.use(async (ctx, next) => {
	ctx.io = io;
	await next();
});

// server.listen(3000)

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
		path: [/^\/api\/auth/, "/"]
	})
);

app.use(async (ctx, next) => {
	try {
		await next();
	} catch (err) {
		ctx.status = err.status || 500;
		ctx.body = {
			error: err.message,
			status: ctx.status,
		};
		// ctx.app.emit('error', err, ctx);
	}
});

// Apply routes
app.use(ApiRouter.routes()).use(ApiRouter.allowedMethods());


// Run server
server.listen(PORT, () => {
	console.log("App is started.");
});

