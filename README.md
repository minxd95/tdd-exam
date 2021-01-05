# MOCHA, Supertest 이용한 TEST CODE 작성


## 주요 사항
1. Babel 사용 시 @babel/register 를 실행 스크립트에 포함하여야 한다.
~~~
"test": "node_modules/.bin/mocha --require @babel/register src/"
~~~
2. Preset은 @babel/preset-env 사용. (공식 프리셋을 사용해야 하는 듯)
3. 총 필요한 babel module : @babel/core,node,preset-env,register
~~~
// src/index.js
import Koa from "koa";
import Router from "koa-router";
import dotenv from "dotenv";

import APIRouter from "./api"; // 클래스 형태로 작성한 라우터 import

dotenv.config();

const app = new Koa();
const router = new Router();

const PORT = process.env.PORT || 3000;

router.use('/api', (new APIRouter()).router.routes());
app.use(router.routes());

const server = app.listen(PORT, () => console.log(`listening at port ${PORT}`));
// 반드시 app.listen(...)을 export 해야 한다. 이렇게 변수에 따로 담아도 됨.

export default server;
~~~

~~~
// src/index.spec.js
import app from './index';
import request from 'supertest';
import expect from 'expect'; // JEST의 expect

describe("/api", () => {
  it("상태코드 200, JSON, [1, 2, 3, 4]", (done) => {
    request(app).get('/api').end((err, result) => { // 여기서 사용하는 expect는 mocha
      if (err) throw err;
      // 여기서부터 expect를 단독으로 사용해야 JEST의 expect 사용 가능
      expect(result).toBeDefined();
      expect(result.status).toEqual(200);
      expect(result.type).toEqual('application/json');
      expect(result.body.data).toEqual([1, 2, 3, 4]);
      done();
    });
  });
});.
~~~

참조 링크:
1. https://jinbroing.tistory.com/148
TDD 라이브러리 - mocha, assert, should, supertest
2. https://www.daleseo.com/jest-basic/
JEST 기초 (Expect )
3. https://velog.io/@pop8682/%EB%B2%88%EC%97%AD-%EC%99%9C-babel-preset%EC%9D%B4-%ED%95%84%EC%9A%94%ED%95%98%EA%B3%A0-%EC%99%9C-%ED%95%84%EC%9A%94%ED%95%9C%EA%B0%80-yhk03drm7q
babel-preset-env는 무엇이고 왜 필요한가?