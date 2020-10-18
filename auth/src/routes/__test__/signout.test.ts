import request from 'supertest';
import { app } from '../../app';

// CUSTOMER SIGN OUT (user.ts)

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

// ADMIN SIGN OUT (admin.ts

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

  expect(response.status).toEqual(201);

  await request(app)
    .post('/auth/api/users/signout')
    .send({})
    .expect(200);
});