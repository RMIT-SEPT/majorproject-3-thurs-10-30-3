import request from 'supertest';
import { app } from '../../app';

// NOTE: NEED TO ADD EXTRA STUFF TO VERIFY TO ENSURE THAT UNIT TESTS ARE THOROUGH

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
  await request(app)
    .post('/auth/api/users/signup')
    .send({
      email: 'test@test.com',
      password: "aaaa",
      name: 'User Name',
      address: '123 Street Name, Suburb',
      phone: '012345678'
    })
    .expect(201);
});

it('returns HTTP Error Code 201 (Created) upon successful customer signup (password between 4 and 20 characters)', async () => {
  return request(app)
    .post('/auth/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      name: 'User Name',
      address: '123 Street Name, Suburb',
      phone: '012345678'
    })
    .expect(201);
});

it('returns HTTP Error Code 201 (Created) upon password input at maximum allowed length of 20 characters during customer signup', async () => {
  await request(app)
    .post('/auth/api/users/signup')
    .send({
      email: 'test@test.com',
      password: "aaaaaaaaaaaaaaaaaaaa",
      name: 'User Name',
      address: '123 Street Name, Suburb',
      phone: '012345678'
    })
    .expect(201);
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
// need business id?

it('returns HTTP Error Code 400 (Bad Request) upon missing name during customer signup', async () => {
  await request(app)
    .post('/auth/api/admin/signup')
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
  await request(app)
    .post('/auth/api/users/signup')
    .send({
      email: 'test@test.com',
      password: "aaaa",
      name: 'User Name',
      address: '123 Street Name, Suburb',
      phone: '012345678'
    })
    .expect(201);
});

it('returns HTTP Error Code 201 (Created) upon successful customer signup (password between 4 and 20 characters)', async () => {
  return request(app)
    .post('/auth/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      name: 'User Name',
      address: '123 Street Name, Suburb',
      phone: '012345678'
    })
    .expect(201);
});

it('returns HTTP Error Code 201 (Created) upon password input at maximum allowed length of 20 characters during customer signup', async () => {
  await request(app)
    .post('/auth/api/users/signup')
    .send({
      email: 'test@test.com',
      password: "aaaaaaaaaaaaaaaaaaaa",
      name: 'User Name',
      address: '123 Street Name, Suburb',
      phone: '012345678'
    })
    .expect(201);
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

/* Worker account signup tests */



// KEEP THIS SINCE IT TELLS ME HOW TO CHECK FOR THE COOKIE EXISTING IN THE RESPONSE

/*
it('sets a cookie after successful signup', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});
*/
