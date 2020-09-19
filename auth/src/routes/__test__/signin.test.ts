import request from 'supertest';
import { app } from '../../app';

/* Customer account signin tests */

it('returns HTTP Error Code 400 (Bad Request) due to missing email input during customer sign in', async () => {
  await request(app)
    .post('/auth/api/users/signin')
    .send({
      email: 'test@test.com'
    })
    .expect(400);
});

it('returns HTTP Error Code 400 (Bad Request) due to incorrect email format during customer sign in', async () => {
  await request(app)
    .post('/auth/api/users/signin')
    .send({
      email: 'incorrectemailformat',
      password: 'password'
    })
    .expect(400);
});

it('returns HTTP Error Code 400 (Bad Request) due to missing password input during customer sign in', async () => {
  await request(app)
    .post('/auth/api/users/signin')
    .send({
      password: 'password'
    })
    .expect(400);
});

//should this not be a 404?
it('returns HTTP Error Code 400 (Bad Request) due to email not being attached to existing user during customer sign in', async () => {
  await request(app)
    .post('/auth/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(400);
});

// is this how i do it? shouldn't we do something else for creating user?
it('returns HTTP Error Code 400 (Bad Request) due to existing user and supplied user having different password during customer sign in', async () => {
  await request(app)
    .post('/auth/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201);

  await request(app)
    .post('/auth/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'aslkdfjalskdfj'
    })
    .expect(400);
});

// successful login
it('returns HTTP Error Code 200 (OK) after successful sign in', async () => {
  await request(app)
    .post('/auth/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201);

  await request(app)
    .post('/auth/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(200);
});

/* Old tests */

// is this right? should this not be part of the validation?

it('Responds with a cookie when given valid credentials', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});
