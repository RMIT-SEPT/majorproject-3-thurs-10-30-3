import request from 'supertest';
import { app } from '../../app';

it('returns HTTP Error Code 400 (Bad Request) when attempting to cancel a schedule that does not exist', async () => {
    const response = await request(app)
        .post('business/cancel/schedule/fakebusinessid')
        .set("Cookie", global.signin())
        .send({
            scheduleId: 'fakescheduleid',
            userId: 'fakeuserid'
        });

    expect(response.status).toEqual(400);
});

it('returns HTTP Error Code 400 (Bad Request) when attempting to cancel a schedule without supplying schedule id', async () => {
    const response = await request(app)
        .post('business/cancel/schedule/fakebusinessid')
        .set("Cookie", global.signin())
        .send({
            userId: 'fakeuserid'
        });

    expect(response.status).toEqual(400);
});

it('returns HTTP Error Code 400 (Bad Request) when attempting to cancel a schedule without supplying user id', async () => {
    const response = await request(app)
        .post('business/cancel/schedule/fakebusinessid')
        .set("Cookie", global.signin())
        .send({
            scheduleId: 'fakescheduleid'
        });

    expect(response.status).toEqual(400);
});

it('returns HTTP Error Code 401 (Unauthorised) when attempting to cancel a schedule without being logged in', async () => {
    const response = await request(app)
        .post('business/cancel/schedule/fakebusinessid')
        .send({
            scheduleId: 'fakescheduleid',
            userId: 'fakeuserid'
        });

    expect(response.status).toEqual(401);
});