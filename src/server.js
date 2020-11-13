import sirv from 'sirv';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import * as sapper from '@sapper/server';

const server = express();

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';


const limiter = rateLimit({
	windowMs: 30 * 60 * 1000,
	max: 2000,
	message: 'request limit exceeded, try again in 30 minutes',
	headers: 'true'
});

const apiLimiter = rateLimit({
	windowMs: 10 * 60 * 1000,
	max: 200,
	message: 'request limit exceeded, try again in 10 minutes',
	headers: 'true'
});


server
	.use('/api', apiLimiter)
	.use(
		limiter,
		compression({ threshold: 0 }),
		bodyParser.json(),
		sirv('static', { dev }),
		sapper.middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
