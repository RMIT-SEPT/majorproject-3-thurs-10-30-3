import request from 'supertest';
import { app } from '../../app';

// CURRENT USER DATA

it('returns HTTP Error Code 401 (Unauthorized) due to attempting to retreive current user data without being logged in', async () => {
    const response = await request(app)
        .post('/auth/api/user/id')
        .send({
            email: 'test@test.com',
            password: 'password',
            name: 'User Name',
            address: '123 Street Name, Suburb',
            phone: '012345678'
        });

    expect(response.status).toEqual(401);
});

it('returns HTTP Error Code 200 (OK) after successfully retreiving super admin current user data', async () => {
    // need to fix code for super before i configure this
});

it('returns HTTP Error Code 200 (OK) after successfully retreiving admin current user data', async () => {
    // need to fix code for super before i configure this
});

it('returns HTTP Error Code 200 (OK) after successfully retreiving user current user data', async () => {
    // need to fix code for super before i configure this
});

it('returns HTTP Error Code 200 (OK) after successfully retreiving worker current user data', async () => {
    // need to fix code for super before i configure this
});

// ANY USER DATA

it('returns HTTP Error Code 401 (Unauthorized) due to attempting to retreive (any) user data without being logged in', async () => {
    // need to fix code for super before i configure this
});

it('returns HTTP Error Code 401 (Unauthorized) due to attempting to retreive (any) user data while logged in as customer user', async () => {
    // need to fix code for super before i configure this
});

it('returns HTTP Error Code 401 (Unauthorized) due to attempting to retreive (any) user data while logged in as worker user', async () => {
    // need to fix code for super before i configure this
});

it('returns HTTP Error Code 404 (Not Found) due to attempting to retreive non-existent user data', async () => {
    // need to fix code for super before i configure this
});

it('returns HTTP Error Code 200 (OK) after successfully retreiving (any) user data', async () => {
    // need to fix code for super before i configure this
});