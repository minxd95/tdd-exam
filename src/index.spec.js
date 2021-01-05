import app from './index';
import request from 'supertest';
import expect from 'expect';

describe("/api", () => {
  it("상태코드 200, JSON, [1, 2, 3, 4]", (done) => {
    request(app).get('/api').end((err, result) => {
      if (err) throw err;
      expect(result).toBeDefined();
      expect(result.status).toEqual(200);
      expect(result.type).toEqual('application/json');
      expect(result.body.data).toEqual([1, 2, 3, 4]);
      done();
    });
  });
});