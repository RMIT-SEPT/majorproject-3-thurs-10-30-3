import request from 'supertest';
import { app } from '../../app';

it('returns HTTP Error Code 401 (Unauthorized) due to attempting to edit worker without being logged in', async () => {
    await request(app)
        .put('/auth/api/worker/1')
        .send({
            shift: "09:00-16:00",
            days: ["mon", "tue", "wed", "thu", "fri"]
        })
        .expect(401);
});

it('returns HTTP Error Code 401 (Unauthorized) due to attempting to edit worker as worker', async () => {
    // need to fix code for super before i configure this
});

it('returns HTTP Error Code 404 (Not Found) due to attempting to edit worker that does not exist', async () => {
    // need to fix code for super before i configure this
});

it('returns HTTP Error Code 400 (Bad Request) due to missing days input', async () => {
    // need to fix code for super before i configure this
});

it('returns HTTP Error Code 400 (Bad Request) due to missing shift input', async () => {
    // need to fix code for super before i configure this
});

it('returns HTTP Error Code 400 (Bad Request) due to days input being empty', async () => {
    // need to fix code for super before i configure this
});

it('returns HTTP Error Code 400 (Bad Request) due to days input being incorrect format', async () => {
    // need to fix code for super before i configure this
});

it('returns HTTP Error Code 400 (Bad Request) due to shift input being incorrect format', async () => {
    // need to fix code for super before i configure this
});

it('returns HTTP Error Code 201 (Created) after successful worker edit', async () => {
    // need to fix code for super before i configure this
});