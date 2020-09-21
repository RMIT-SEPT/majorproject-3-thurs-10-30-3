import request from 'supertest';
import { app } from '../../app';

// GET BUSINESSES

it('returns HTTP Error Code 200 (OK) after successfully querying list of businesses', async () => {
    const response = await request(app)
        .get('/business/api/business')
        .send({});

    expect(response.status).toEqual(200);
});

// GET BUSINESS BY ID

it('returns HTTP Error Code 400 (Bad Request) after attempting to retreive a business that does not exist (business id does not match)', async () => {
    const response = await request(app)
        .get('/business/api/business/fakebusinessid')
        .send({});

    expect(response.status).toEqual(400);
});

it('returns HTTP Error Code 200 (OK) after successfully querying a individual businesses', async () => {
    const setup_response = await request(app)
        .post('/business/api/business')
        .set("Cookie", global.signin())
        .send({
            name: 'Business Name',
            serviceType: 'Type Of Service',
            serviceProvided: [{
                name: 'Service One',
                time: '10'
            }, {
                name: 'Service Two',
                time: '20'
            }, {
                name: 'Service Three',
                time: '30'
            }]
        });

    expect(setup_response.status).toEqual(201);


    var businessID = setup_response.body._id;

    const response = await request(app)
        .post('/business/api/business/' + businessID)
        .set("Cookie", global.signin())
        .send({});

    expect(response.status).toEqual(404);
});