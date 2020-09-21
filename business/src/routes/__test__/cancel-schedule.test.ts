import request from 'supertest';
import { app } from '../../app';

it('returns HTTP Error Code 401 (Unauthorized) when attempting to cancel a schedule without logging in', async () => {
    const response = await request(app)
        .post('/business/api/admin/signup')
        .set("Cookie", global.signin())
        .send({
            email: 'test@test.com',
            password: "aaaa",
            name: 'User Name',
            address: '123 Street Name, Suburb',
            phone: '012345678',
            businessId: '01234'
        });

    expect(response.status).toEqual(201);
});

it("returns HTTP Error Code 404 (Not Found) when attempting to cancel a schedule that doesn't exist (schedule ID refers to no schedule existing)", async () => {

});

it("returns HTTP Error Code 400 (Bad Request) when attempting to cancel a schedule without supplying user ID", async () => {

});

it("returns HTTP Error Code 400 (Bad Request) when attempting to cancel a schedule without supplying business ID", async () => {

});

it("returns HTTP Error Code 400 (Bad Request) when attempting to cancel a schedule that doesn't exist (schedule ID refers to no schedule existing)", async () => {

});

it("returns HTTP Error Code 200 (OK) after success in cancelling schedule", async () => {

});

