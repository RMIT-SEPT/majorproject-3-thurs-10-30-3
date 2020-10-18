import request from 'supertest';
import { app } from '../../app';

it('returns HTTP Error Code 400 (Bad Request) when attempting to create a business with duplicate name', async () => {
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

    const response = await request(app)
        .post('/business/api/business')
        .set("Cookie", global.signin())
        .send({
            name: 'Business Name',
            serviceType: 'Another Type Of Service',
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

    expect(response.status).toEqual(400);
});

it('returns HTTP Error Code 401 (Unauthorized) when attempting to create a business without logging in', async () => {
    const response = await request(app)
        .post('/business/api/business')
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

    expect(response.status).toEqual(401);
});

it('returns HTTP Error Code 400 (Bad Request) when attempting to create business when missing name field', async () => {
    const response = await request(app)
        .post('/business/api/business')
        .set("Cookie", global.signin())
        .send({
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

    expect(response.status).toEqual(400);
});

it('returns HTTP Error Code 400 (Bad Request) when attempting to create business when missing service type field', async () => {
    const response = await request(app)
        .post('/business/api/business')
        .set("Cookie", global.signin())
        .send({
            name: 'Business Name',
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

    expect(response.status).toEqual(400);
});

it('returns HTTP Error Code 400 (Bad Request) when attempting to create business when missing services provided field', async () => {
    const response = await request(app)
        .post('/business/api/business')
        .set("Cookie", global.signin())
        .send({
            name: 'Business Name',
            serviceType: 'Type Of Service'
        });

    expect(response.status).toEqual(400);
});

it('returns HTTP Error Code 400 (Bad Request) when attempting to create business with incorrect services provided field format', async () => {
    const response = await request(app)
        .post('/business/api/business')
        .set("Cookie", global.signin())
        .send({
            name: 'Business Name',
            serviceType: 'Type Of Service',
            serviceProvided: 'stringinsteadofarray'
        });

    expect(response.status).toEqual(400);
});

it('returns HTTP Error Code 201 (Created) when business creation succeeds', async () => {
    const response = await request(app)
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

    expect(response.status).toEqual(201);
});