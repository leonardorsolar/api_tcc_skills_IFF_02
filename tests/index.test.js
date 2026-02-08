const request = require('supertest');
const { app, server } = require('../index');

describe('GET /', () => {
  afterAll((done) => {
    server.close(done);
  });

  it('should return status 200', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });

  it('should return JSON content type', async () => {
    const response = await request(app).get('/');
    expect(response.headers['content-type']).toMatch(/json/);
  });

  it('should return Hello World message', async () => {
    const response = await request(app).get('/');
    expect(response.body).toEqual({ message: 'Hello World' });
  });

  it('should not expose x-powered-by header', async () => {
    const response = await request(app).get('/');
    expect(response.headers['x-powered-by']).toBeUndefined();
  });
});
