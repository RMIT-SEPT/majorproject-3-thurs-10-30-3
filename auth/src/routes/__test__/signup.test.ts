import request from 'supertest';
import { app } from '../../app';

// DEV NOTE: possibly should add more assertions in these tests

// CUSTOMER SIGN UP (user.ts)

it('returns HTTP Error Code 400 (Bad Request) upon missing name during customer signup', async () => {
  await request(app)
    .post('/auth/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      address: '123 Street Name, Suburb',
      phone: '012345678'
    })
    .expect(400);
});

it('returns HTTP Error Code 400 (Bad Request) upon missing address during customer signup', async () => {
  await request(app)
    .post('/auth/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      name: 'User Name',
      phone: '012345678'
    })
    .expect(400);
});

it('returns HTTP Error Code 400 (Bad Request) upon missing phone during customer signup', async () => {
  await request(app)
    .post('/auth/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      name: 'User Name',
      address: '123 Street Name, Suburb'
    })
    .expect(400);
});

it('returns HTTP Error Code 400 (Bad Request) upon missing email during customer signup', async () => {
  await request(app)
    .post('/auth/api/users/signup')
    .send({
      password: 'password',
      name: 'User Name',
      address: '123 Street Name, Suburb',
      phone: '012345678'
    })
    .expect(400);
});

it('returns HTTP Error Code 400 (Bad Request) upon email submitted with incorrect email format (non valid email) during customer signup', async () => {
  return request(app)
    .post('/auth/api/users/signup')
    .send({
      email: 'notavalidemailstring',
      password: 'password',
      name: 'User Name',
      address: '123 Street Name, Suburb',
      phone: '012345678'
    })
    .expect(400);
});

it('returns HTTP Error Code 400 (Bad Request) upon missing password during customer signup', async () => {
  await request(app)
    .post('/auth/api/users/signup')
    .send({
      email: 'test@test.com',
      name: 'User Name',
      address: '123 Street Name, Suburb',
      phone: '012345678'
    })
    .expect(400);
});

it('returns HTTP Error Code 400 (Bad Request) upon password input below minimum required length of 4 characters during customer signup', async () => {
  await request(app)
    .post('/auth/api/users/signup')
    .send({
      email: 'test@test.com',
      password: "aaa",
      name: 'User Name',
      address: '123 Street Name, Suburb',
      phone: '012345678'
    })
    .expect(400);
});

it('returns HTTP Error Code 201 (Created) upon password input at minimum required length of 4 characters during customer signup', async () => {
  const response = await request(app)
    .post('/auth/api/users/signup')
    .send({
      email: 'test@test.com',
      password: "aaaa",
      name: 'User Name',
      address: '123 Street Name, Suburb',
      phone: '012345678'
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});

it('returns HTTP Error Code 201 (Created) upon successful customer signup (password between 4 and 20 characters)', async () => {
  const response = await request(app)
    .post('/auth/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      name: 'User Name',
      address: '123 Street Name, Suburb',
      phone: '012345678'
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});

it('returns HTTP Error Code 201 (Created) upon password input at maximum allowed length of 20 characters during customer signup', async () => {
  const response = await request(app)
    .post('/auth/api/users/signup')
    .send({
      email: 'test@test.com',
      password: "aaaaaaaaaaaaaaaaaaaa",
      name: 'User Name',
      address: '123 Street Name, Suburb',
      phone: '012345678'
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});

it('returns HTTP Error Code 400 (Bad Request) upon password input above maximum allowed length of 20 characters during customer signup', async () => {
  await request(app)
    .post('/auth/api/users/signup')
    .send({
      email: 'test@test.com',
      password: "aaaaaaaaaaaaaaaaaaaaa",
      name: 'User Name',
      address: '123 Street Name, Suburb',
      phone: '012345678'
    })
    .expect(400);
});

it('returns HTTP Error Code 400 (Bad Request) upon attemtping to sign up with email attached to existing user during customer signup', async () => {
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
    .post('/auth/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      name: 'User Name',
      address: '123 Street Name, Suburb',
      phone: '012345678'
    })
    .expect(400);
});

// ADMIN SIGN UP (admin.ts)

it('returns HTTP Error Code 400 (Bad Request) upon missing name during admin signup', async () => {
  await request(app)
    .post('/auth/api/admin/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      address: '123 Street Name, Suburb',
      phone: '012345678',
      businessId: '01234'
    })
    .expect(400);
});

it('returns HTTP Error Code 400 (Bad Request) upon missing address during admin signup', async () => {
  await request(app)
    .post('/auth/api/admin/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      name: 'User Name',
      phone: '012345678',
      businessId: '01234'
    })
    .expect(400);
});

it('returns HTTP Error Code 400 (Bad Request) upon missing phone during admin signup', async () => {
  await request(app)
    .post('/auth/api/admin/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      name: 'User Name',
      address: '123 Street Name, Suburb',
      businessId: '01234'
    })
    .expect(400);
});

it('returns HTTP Error Code 400 (Bad Request) upon missing business ID during admin signup', async () => {
  await request(app)
    .post('/auth/api/admin/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      name: 'User Name',
      address: '123 Street Name, Suburb',
      businessId: '01234',
      phone: '012345678'
    })
    .expect(400);
});

it('returns HTTP Error Code 400 (Bad Request) upon missing email during admin signup', async () => {
  await request(app)
    .post('/auth/api/admin/signup')
    .send({
      password: 'password',
      name: 'User Name',
      address: '123 Street Name, Suburb',
      phone: '012345678',
      businessId: '01234'
    })
    .expect(400);
});

it('returns HTTP Error Code 400 (Bad Request) upon email submitted with incorrect email format (non valid email) during admin signup', async () => {
  return request(app)
    .post('/auth/api/admin/signup')
    .send({
      email: 'notavalidemailstring',
      password: 'password',
      name: 'User Name',
      address: '123 Street Name, Suburb',
      phone: '012345678',
      businessId: '01234'
    })
    .expect(400);
});

it('returns HTTP Error Code 400 (Bad Request) upon missing password during admin signup', async () => {
  await request(app)
    .post('/auth/api/admin/signup')
    .send({
      email: 'test@test.com',
      name: 'User Name',
      address: '123 Street Name, Suburb',
      phone: '012345678',
      businessId: '01234'
    })
    .expect(400);
});


it('returns HTTP Error Code 400 (Bad Request) upon password input below minimum required length of 4 characters during admin signup', async () => {
  await request(app)
    .post('/auth/api/admin/signup')
    .send({
      email: 'test@test.com',
      password: "aaa",
      name: 'User Name',
      address: '123 Street Name, Suburb',
      phone: '012345678',
      businessId: '01234'
    })
    .expect(400);
});

it('returns HTTP Error Code 201 (Created) upon password input at minimum required length of 4 characters during admin signup', async () => {
  const response = await request(app)
    .post('/auth/api/admin/signup')
    .send({
      email: 'test@test.com',
      password: "aaaa",
      name: 'User Name',
      address: '123 Street Name, Suburb',
      phone: '012345678',
      businessId: '01234'
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});

it('returns HTTP Error Code 201 (Created) upon successful admin signup (password between 4 and 20 characters)', async () => {
  const response = await request(app)
    .post('/auth/api/admin/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      name: 'User Name',
      address: '123 Street Name, Suburb',
      phone: '012345678',
      businessId: '01234'
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});

it('returns HTTP Error Code 201 (Created) upon password input at maximum allowed length of 20 characters during admin signup', async () => {
  const response = await request(app)
    .post('/auth/api/admin/signup')
    .send({
      email: 'test@test.com',
      password: "aaaaaaaaaaaaaaaaaaaa",
      name: 'User Name',
      address: '123 Street Name, Suburb',
      phone: '012345678',
      businessId: '01234'
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});

it('returns HTTP Error Code 400 (Bad Request) upon password input above maximum allowed length of 20 characters during admin signup', async () => {
  await request(app)
    .post('/auth/api/admin/signup')
    .send({
      email: 'test@test.com',
      password: "aaaaaaaaaaaaaaaaaaaaa",
      name: 'User Name',
      address: '123 Street Name, Suburb',
      phone: '012345678',
      businessId: '01234'
    })
    .expect(400);
});

it('returns HTTP Error Code 400 (Bad Request) upon attemtping to sign up with email attached to existing user during admin signup', async () => {
  await request(app)
    .post('/auth/api/admin/signup')
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
    .post('/auth/api/admin/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      name: 'User Name',
      address: '123 Street Name, Suburb',
      phone: '012345678',
      businessId: '01234'
    })
    .expect(400);
});

// WORKER SIGN UP (worker.ts)

it('returns HTTP Error Code 400 (Bad Request) upon missing name during worker signup', async () => {
  await request(app)
    .post('/auth/api/worker/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      address: '123 Street Name, Suburb',
      phone: '012345678',
      businessId: "5f6323eb8c491b0031f1784e",
      shift: "09:00-16:00",
      days: ["mon", "tue", "wed", "thu", "fri"]
    })
    .expect(400);
});

it('returns HTTP Error Code 400 (Bad Request) upon missing address during worker signup', async () => {
  await request(app)
    .post('/auth/api/worker/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      name: 'User Name',
      phone: '012345678',
      businessId: "5f6323eb8c491b0031f1784e",
      shift: "09:00-16:00",
      days: ["mon", "tue", "wed", "thu", "fri"]
    })
    .expect(400);
});

it('returns HTTP Error Code 400 (Bad Request) upon missing phone during worker signup', async () => {
  await request(app)
    .post('/auth/api/worker/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      name: 'User Name',
      address: '123 Street Name, Suburb',
      businessId: "5f6323eb8c491b0031f1784e",
      shift: "09:00-16:00",
      days: ["mon", "tue", "wed", "thu", "fri"]
    })
    .expect(400);
});

it('returns HTTP Error Code 400 (Bad Request) upon missing business ID during worker signup', async () => {
  await request(app)
    .post('/auth/api/worker/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      name: 'User Name',
      address: '123 Street Name, Suburb',
      phone: '012345678',
      shift: "09:00-16:00",
      days: ["mon", "tue", "wed", "thu", "fri"]
    })
    .expect(400);
});

it('returns HTTP Error Code 400 (Bad Request) upon missing shift during worker signup', async () => {
  await request(app)
    .post('/auth/api/worker/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      name: 'User Name',
      address: '123 Street Name, Suburb',
      phone: '012345678',
      businessId: "5f6323eb8c491b0031f1784e",
      days: ["mon", "tue", "wed", "thu", "fri"]
    })
    .expect(400);
});

it('returns HTTP Error Code 400 (Bad Request) upon missing days of shift during worker signup', async () => {
  await request(app)
    .post('/auth/api/worker/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      name: 'User Name',
      address: '123 Street Name, Suburb',
      phone: '012345678',
      businessId: "5f6323eb8c491b0031f1784e",
      shift: "09:00-16:00"
    })
    .expect(400);
});

it('returns HTTP Error Code 400 (Bad Request) upon missing email during worker signup', async () => {
  await request(app)
    .post('/auth/api/worker/signup')
    .send({
      password: 'password',
      name: 'User Name',
      address: '123 Street Name, Suburb',
      phone: '012345678',
      businessId: "5f6323eb8c491b0031f1784e",
      shift: "09:00-16:00",
      days: ["mon", "tue", "wed", "thu", "fri"]
    })
    .expect(400);
});

it('returns HTTP Error Code 400 (Bad Request) upon email submitted with incorrect email format (non valid email) during worker signup', async () => {
  return request(app)
    .post('/auth/api/worker/signup')
    .send({
      email: 'notavalidemailstring',
      password: 'password',
      name: 'User Name',
      address: '123 Street Name, Suburb',
      phone: '012345678',
      businessId: "5f6323eb8c491b0031f1784e",
      shift: "09:00-16:00",
      days: ["mon", "tue", "wed", "thu", "fri"]
    })
    .expect(400);
});

it('returns HTTP Error Code 400 (Bad Request) upon missing password during worker signup', async () => {
  await request(app)
    .post('/auth/api/worker/signup')
    .send({
      email: 'test@test.com',
      name: 'User Name',
      address: '123 Street Name, Suburb',
      phone: '012345678',
      businessId: "5f6323eb8c491b0031f1784e",
      shift: "09:00-16:00",
      days: ["mon", "tue", "wed", "thu", "fri"]
    })
    .expect(400);
});

it('returns HTTP Error Code 400 (Bad Request) upon password input below minimum required length of 4 characters during worker signup', async () => {
  await request(app)
    .post('/auth/api/worker/signup')
    .send({
      email: 'test@test.com',
      password: "aaa",
      name: 'User Name',
      address: '123 Street Name, Suburb',
      phone: '012345678',
      businessId: "5f6323eb8c491b0031f1784e",
      shift: "09:00-16:00",
      days: ["mon", "tue", "wed", "thu", "fri"]
    })
    .expect(400);
});

it('returns HTTP Error Code 201 (Created) upon password input at minimum required length of 4 characters during worker signup', async () => {
  const response = await request(app)
    .post('/auth/api/worker/signup')
    .send({
      email: 'test@test.com',
      password: "aaaa",
      name: 'User Name',
      address: '123 Street Name, Suburb',
      phone: '012345678',
      businessId: "5f6323eb8c491b0031f1784e",
      shift: "09:00-16:00",
      days: ["mon", "tue", "wed", "thu", "fri"]
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});

it('returns HTTP Error Code 201 (Created) upon successful worker signup (password between 4 and 20 characters)', async () => {
  const response = await request(app)
    .post('/auth/api/worker/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      name: 'User Name',
      address: '123 Street Name, Suburb',
      phone: '012345678',
      businessId: "5f6323eb8c491b0031f1784e",
      shift: "09:00-16:00",
      days: ["mon", "tue", "wed", "thu", "fri"]
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});

it('returns HTTP Error Code 201 (Created) upon password input at maximum allowed length of 20 characters during worker signup', async () => {
  const response = await request(app)
    .post('/auth/api/worker/signup')
    .send({
      email: 'test@test.com',
      password: "aaaaaaaaaaaaaaaaaaaa",
      name: 'User Name',
      address: '123 Street Name, Suburb',
      phone: '012345678',
      businessId: "5f6323eb8c491b0031f1784e",
      shift: "09:00-16:00",
      days: ["mon", "tue", "wed", "thu", "fri"]
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});

it('returns HTTP Error Code 400 (Bad Request) upon password input above maximum allowed length of 20 characters during worker signup', async () => {
  await request(app)
    .post('/auth/api/worker/signup')
    .send({
      email: 'test@test.com',
      password: "aaaaaaaaaaaaaaaaaaaaa",
      name: 'User Name',
      address: '123 Street Name, Suburb',
      phone: '012345678',
      businessId: "5f6323eb8c491b0031f1784e",
      shift: "09:00-16:00",
      days: ["mon", "tue", "wed", "thu", "fri"]
    })
    .expect(400);
});

it('returns HTTP Error Code 400 (Bad Request) upon attemtping to sign up with email attached to existing user during worker signup', async () => {
  await request(app)
    .post('/auth/api/worker/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      name: 'User Name',
      address: '123 Street Name, Suburb',
      phone: '012345678',
      businessId: "5f6323eb8c491b0031f1784e",
      shift: "09:00-16:00",
      days: ["mon", "tue", "wed", "thu", "fri"]
    })
    .expect(201);

  await request(app)
    .post('/auth/api/worker/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      name: 'User Name',
      address: '123 Street Name, Suburb',
      phone: '012345678',
      businessId: "5f6323eb8c491b0031f1784e",
      shift: "09:00-16:00",
      days: ["mon", "tue", "wed", "thu", "fri"]
    })
    .expect(400);
});