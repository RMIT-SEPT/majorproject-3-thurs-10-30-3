import request from 'supertest';
import { app } from '../../app';

// NOTE: NEED TO ADD EXTRA STUFF TO VERIFY TO ENSURE THAT UNIT TESTS ARE THOROUGH

/* Customer account signup tests */

it('returns HTTP Error Code 400 (Bad Request) upon missing email during customer signup', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com'
    })
    .expect(400);
});

it('returns HTTP Error Code 400 (Bad Request) upon email submitted with incorrect email format (non valid email) during customer signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'notavalidemailstring',
      password: 'password'
    })
    .expect(400);
});

it('returns HTTP Error Code 400 (Bad Request) upon missing password during customer signup', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      password: 'password'
    })
    .expect(400);
});


it('returns HTTP Error Code 400 (Bad Request) upon password input below minimum required length of 4 characters during customer signup', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: "aaa"
    })
    .expect(400);
});

it('returns HTTP Error Code 201 (Created) upon password input at minimum required length of 4 characters during customer signup', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: "aaaa"
    })
    .expect(201);
});

it('returns HTTP Error Code 201 (Created) upon successful customer signup (password between 4 and 20 characters)', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201);
});

it('returns HTTP Error Code 201 (Created) upon password input at maximum allowed length of 20 characters during customer signup', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: "aaaaaaaaaaaaaaaaaaaa"
    })
    .expect(201);
});

it('returns HTTP Error Code 400 (Bad Request) upon password input above maximum allowed length of 20 characters during customer signup', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: "aaaaaaaaaaaaaaaaaaaaa"
    })
    .expect(400);
});

/* Is it okay to do this? shouldn't we find a way to add user without making an API call? */
it('returns HTTP Error Code 400 (Bad Request) upon attemtping to sign up with email attached to existing user during customer signup', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(400);
});

/* Admin account signup tests */

it('returns HTTP Error Code 400 (Bad Request) upon missing email during admin signup', async () => {
  await request(app)
    .post('/api/admin/signup')
    .send({
      email: 'test@test.com'
    })
    .expect(400);
});

it('returns HTTP Error Code 400 (Bad Request) upon email submitted with incorrect email format (non valid email) during admin signup', async () => {
  return request(app)
    .post('/api/admin/signup')
    .send({
      email: 'notavalidemailstring',
      password: 'password'
    })
    .expect(400);
});

it('returns HTTP Error Code 400 (Bad Request) upon missing password during admin signup', async () => {
  await request(app)
    .post('/api/admin/signup')
    .send({
      password: 'password'
    })
    .expect(400);
});


it('returns HTTP Error Code 400 (Bad Request) upon password input below minimum required length of 4 characters during admin signup', async () => {
  await request(app)
    .post('/api/admin/signup')
    .send({
      email: 'test@test.com',
      password: "aaa"
    })
    .expect(400);
});

it('returns HTTP Error Code 201 (Created) upon password input at minimum required length of 4 characters during admin signup', async () => {
  await request(app)
    .post('/api/admin/signup')
    .send({
      email: 'test@test.com',
      password: "aaaa"
    })
    .expect(201);
});

it('returns HTTP Error Code 201 (Created) upon successful admin signup (password between 4 and 20 characters)', async () => {
  return request(app)
    .post('/api/admin/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201);
});

it('returns HTTP Error Code 201 (Created) upon password input at maximum allowed length of 20 characters during admin signup', async () => {
  await request(app)
    .post('/api/admin/signup')
    .send({
      email: 'test@test.com',
      password: "aaaaaaaaaaaaaaaaaaaa"
    })
    .expect(201);
});

it('returns HTTP Error Code 400 (Bad Request) upon password input above maximum allowed length of 20 characters during admin signup', async () => {
  await request(app)
    .post('/api/admin/signup')
    .send({
      email: 'test@test.com',
      password: "aaaaaaaaaaaaaaaaaaaaa"
    })
    .expect(400);
});

it('returns HTTP Error Code 400 (Bad Request) upon attemtping to sign up with email attached to existing user during admin signup', async () => {
  await request(app)
    .post('/api/admin/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201);

  await request(app)
    .post('/api/admin/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(400);
});


/* Worker account signup tests */



/* Old tests */

/* Is this needed? Can't it be checked within the positive one? */
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
