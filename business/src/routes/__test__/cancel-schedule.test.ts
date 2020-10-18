import request from 'supertest';
import { app } from '../../app';

it('returns HTTP Error Code 400 (Bad Request) when attempting to cancel a schedule that does not exist', async () => {
    const response = await request(app)
        .post('/business/api/business/cancel/schedule/21fdsf')
        .set("Cookie", global.signin())
        .send({
            scheduleId: 'fakescheduleid',
            userId: 'fakeuserid'
        });

    expect(response.status).toEqual(400);
});

it('returns HTTP Error Code 404 (Bad Request) when attempting to cancel a schedule with non-existing business id', async () => {
    const response = await request(app)
        .post('/business/api/business/cancel/schedule/5f60a589e0bc75001758f989')
        .set("Cookie", global.signin())
        .send({
            scheduleId: 'fakescheduleid',
            userId: 'fakeuserid'
        });

    expect(response.status).toEqual(400);
});

it('returns HTTP Error Code 400 (Bad Request) when attempting to cancel a schedule without supplying schedule id', async () => {
    const response = await request(app)
        .post('/business/api/business/cancel/schedule/21fdsf')
        .set("Cookie", global.signin())
        .send({
            userId: 'fakeuserid'
        });
    expect(response.status).toEqual(400);
});

it('returns HTTP Error Code 400 (Bad Request) when attempting to cancel a schedule without supplying user id', async () => {
    const response = await request(app)
        .post('/business/api/business/cancel/schedule/21fdsf')
        .set("Cookie", global.signin())
        .send({
            scheduleId: 'fakescheduleid'
        });

    expect(response.status).toEqual(400);
});

it('returns HTTP Error Code 401 (Unauthorised) when attempting to cancel a schedule without being logged in', async () => {
    const response = await request(app)
        .post('/business/api/business/cancel/schedule/21fdsf')
        .send({
            scheduleId: 'fakescheduleid',
            userId: 'fakeuserid'
        });

    expect(response.status).toEqual(401);
});