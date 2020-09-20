import request from 'supertest';
import { app } from '../../app';
import { natsWrapper } from '../../nats-wrapper';

it('Create business with super admin account', async () => {
  const response = await request(app)
    .post('/business/api/business')
    .set('Cookie', global.signin())
    .send({});

  //response.text is the actually JSON response returend.
  // and this needs to be parsed to be compared with whatever we want to compare
  // if you run this code, you will see what we are expecting(obejct {error:"test"} in this case) 
  // and what is actually returned.
  expect(JSON.parse(response.text)).toEqual({error:"test"});

  // You can just test status code
  // expect(response.status).not.toEqual(401);
});
