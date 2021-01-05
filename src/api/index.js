import Router from 'koa-Router';

export default class APIRouter {
  constructor() {
    this.router = new Router();
    this.router.get('/', (ctx, next) => {
      ctx.body = { message: 'success', data: [1, 2, 3, 4] };
    });
  }
}
