import request from 'supertest';
import { app } from '../../app';

// SUPER ADMIN SIGN IN (admin.ts)

it('returns HTTP Error Code 400 (Bad Request) due to missing email input during super admin sign in', async () => {
  await request(app)
    .post('/auth/api/users/signin')
    .send({
      email: 'test@test.com'
    })
    .expect(400);
});

it('returns HTTP Error Code 400 (Bad Request) due to incorrect email format during super admin sign in', async () => {
  await request(app)
    .post('/auth/api/users/signin')
    .send({
      email: 'incorrectemailformat',
      password: 'password'
    })
    .expect(400);
});

it('returns HTTP Error Code 400 (Bad Request) due to missing password input during super admin sign in', async () => {
  await request(app)
    .post('/auth/api/users/signin')
    .send({
      password: 'password'
    })
    .expect(400);
});

it('returns HTTP Error Code 400 (Bad Request) due to email not being attached to existing user during super admin sign in', async () => {
  await request(app)
    .post('/auth/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(400);
});

it('returns HTTP Error Code 400 (Bad Request) due to existing super admin and supplied super admin having different password during super admin sign in', async () => {
  await request(app)
    .post('/auth/api/super/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      name: 'User Name',
      secretKey: 'createsuper'
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

it('returns HTTP Error Code 200 (OK) after successful customer sign in', async () => {
  await request(app)
    .post('/auth/api/super/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      name: 'User Name',
      secretKey: 'createsuper'
    })
    .expect(201);

  const response = await request(app)
    .post('/auth/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(200);
});

// CUSTOMER SIGN IN (user.ts)

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

it('returns HTTP Error Code 400 (Bad Request) due to email not being attached to existing user during customer sign in', async () => {
  await request(app)
    .post('/auth/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(400);
});

it('returns HTTP Error Code 400 (Bad Request) due to existing user and supplied user having different password during customer sign in', async () => {
  await request(app)
    .post('/auth/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      name: 'User Name',
      address: '123 Street Name, Suburb',
      phone: '012345678'
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

it('returns HTTP Error Code 200 (OK) after successful customer sign in', async () => {
  await request(app)
    .post('/auth/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      name: 'User Name',
      address: '123 Street Name, Suburb',
      phone: '012345678'
    })
    .expect(201);

  const response = await request(app)
    .post('/auth/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});

// ADMIN SIGN IN (admin.ts)

it('returns HTTP Error Code 400 (Bad Request) due to missing email input during admin sign in', async () => {
  await request(app)
    .post('/auth/api/users/signin')
    .send({
      email: 'test@test.com'
    })
    .expect(400);
});

it('returns HTTP Error Code 400 (Bad Request) due to incorrect email format during admin sign in', async () => {
  await request(app)
    .post('/auth/api/users/signin')
    .send({
      email: 'incorrectemailformat',
      password: 'password'
    })
    .expect(400);
});

it('returns HTTP Error Code 400 (Bad Request) due to missing password input during admin sign in', async () => {
  await request(app)
    .post('/auth/api/users/signin')
    .send({
      password: 'password'
    })
    .expect(400);
});

it('returns HTTP Error Code 400 (Bad Request) due to email not being attached to existing user during admin sign in', async () => {
  await request(app)
    .post('/auth/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(400);
});

it('returns HTTP Error Code 400 (Bad Request) due to existing user and supplied user having different password during admin sign in', async () => {
  await request(app)
    .post('/auth/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      name: 'User Name',
      address: '123 Street Name, Suburb',
      phone: '012345678',
      businessId: '01234'
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

it('returns HTTP Error Code 200 (OK) after successful admin sign in', async () => {
  await request(app)
    .post('/auth/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      name: 'User Name',
      address: '123 Street Name, Suburb',
      phone: '012345678',
      businessId: '01234'
    })
    .expect(201);

  const response = await request(app)
    .post('/auth/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});

// WORKER SIGN IN (worker.ts)

it('returns HTTP Error Code 400 (Bad Request) due to missing email input during worker sign in', async () => {
  await request(app)
    .post('/auth/api/users/signin')
    .send({
      email: 'test@test.com'
    })
    .expect(400);
});

it('returns HTTP Error Code 400 (Bad Request) due to incorrect email format during worker sign in', async () => {
  await request(app)
    .post('/auth/api/users/signin')
    .send({
      email: 'incorrectemailformat',
      password: 'password'
    })
    .expect(400);
});

it('returns HTTP Error Code 400 (Bad Request) due to missing password input during worker sign in', async () => {
  await request(app)
    .post('/auth/api/users/signin')
    .send({
      password: 'password'
    })
    .expect(400);
});

it('returns HTTP Error Code 400 (Bad Request) due to email not being attached to existing user during worker sign in', async () => {
  await request(app)
    .post('/auth/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(400);
});

it('returns HTTP Error Code 400 (Bad Request) due to existing user and supplied user having different password during worker sign in', async () => {
  await request(app)
    .post('/auth/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      name: 'User Name',
      address: '123 Street Name, Suburb',
      phone: '012345678',
      businessId: '01234'
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

it('returns HTTP Error Code 200 (OK) after successful worker sign in', async () => {
  await request(app)
    .post('/auth/api/users/signup')
    .send({
      email: 'test@test.com',
      password: "password",
      name: 'User Name',
      address: '123 Street Name, Suburb',
      phone: '012345678',
      businessId: "5f6323eb8c491b0031f1784e",
      shift: "09:00-16:00",
      days: ["mon", "tue", "wed", "thu", "fri"]
    })
    .expect(201);

  const response = await request(app)
    .post('/auth/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});
