import request from 'supertest';
import { app } from '../../app';

// CUSTOMER SIGN OUT (user.ts)

it('returns HTTP Error Code 401 (Unauthorized) after attempting to log out of customer account without being logged in', async () => {
  await request(app)
    .post('/auth/api/users/signout')
    .send({})
    .expect(401);
});

it('returns HTTP Error Code 200 (OK) on successful log out of customer account', async () => {
  await request(app)
    .post('/auth/api/users/signup')
    .send({
      email: 'test@test.com',
      password: "password",
      name: 'User Name',
      address: '123 Street Name, Suburb',
      phone: '012345678'
    })
    .expect(201);

  await request(app)
    .post('/auth/api/users/signout')
    .send({})
    .expect(200);
});

// ADMIN SIGN OUT (admin.ts)

it('returns HTTP Error Code 401 (Unauthorized) after attempting to log out of admin account without being logged in', async () => {
  await request(app)
    .post('/auth/api/users/signout')
    .send({})
    .expect(401);
});

it('returns HTTP Error Code 200 (OK) on successful log out of admin account', async () => {
  const response = await request(app)
    .post('/auth/api/admin/signup')
    .set("Cookie", global.signin())
    .send({
      email: 'test@test.com',
      password: "password",
      name: 'User Name',
      address: '123 Street Name, Suburb',
      phone: '012345678',
      businessId: '01234'
    });

  expect(response.status).toEqual(200);

  await request(app)
    .post('/auth/api/users/signout')
    .send({})
    .expect(200);
});

// WORKER SIGN OUT (worker.ts)

it('returns HTTP Error Code 401 (Unauthorized) after attempting to log out of worker account without being logged in', async () => {
  await request(app)
    .post('/auth/api/users/signout')
    .send({})
    .expect(401);
});

it('returns HTTP Error Code 200 (OK) on successful log out of worker account', async () => {
  const response = await request(app)
    .post('/auth/api/worker/signup')
    .set("Cookie", global.signin())
    .send({
      email: 'test@test.com',
      password: "aaaa",
      name: 'User Name',
      address: '123 Street Name, Suburb',
      phone: '012345678',
      businessId: "5f6323eb8c491b0031f1784e",
      shift: "09:00-16:00",
      days: ["mon", "tue", "wed", "thu", "fri"]
    });

  expect(response.status).toEqual(200);

  await request(app)
    .post('/auth/api/users/signout')
    .send({})
    .expect(200);
});