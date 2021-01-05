import Koa from "koa";
import Router from "koa-router";
import dotenv from "dotenv";

import APIRouter from "./api";

dotenv.config();

const app = new Koa();
const router = new Router();

const PORT = process.env.PORT || 3000;

router.use('/api', (new APIRouter()).router.routes());
app.use(router.routes());

const server = app.listen(PORT, () => console.log(`listening at port ${PORT}`));

export default server;