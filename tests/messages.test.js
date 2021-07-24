const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

test('can create a new message', async () => {
  const res = await api.post('/api/messages').send({
    sender: 1,
    recipient: 2,
    message: 'this is a test'
  });

  expect(res.statusCode).toEqual(200);
  expect(res.body).toHaveProperty('id');
});

// todo: add more tests
