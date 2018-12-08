const Koa = require('koa');
const Router = require('koa-router');
const logger = require('./../src/logger.js').getLogger();

const app = new Koa();
const router = new Router();
const { PORT } = process.env;

router.get('/', ctx => {
  ctx.body = 'Default page';
});

router.get('/hello', ctx => {
  ctx.body = 'Hello Node.js!';
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT);
logger.info(`Listening on localhost:${PORT}`);
