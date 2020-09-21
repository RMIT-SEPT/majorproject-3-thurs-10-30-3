import request from 'supertest';
import { app } from '../../app';

// ADDING SCHEDULE

it('returns HTTP Error Code 404 (Not Found) when attempting to add to business that does not exist', async () => {
    const response = await request(app)
        .post('/business/api/create/schedule/id')
        .send({
            userID: 'notfound',
            workerID: 'notfound',
            scheduledTime: '11:00-11:50',
            date: '2020-11-03',
            serviceType: ['Service One']
        });

    expect(response.status).toEqual(404);
});

it('returns HTTP Error Code 404 (Not Found) when attempting to create schedule with invalid user ID and worker ID', async () => {
    // Create business
    const setup_response_business = await request(app)
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

    expect(setup_response_business.status).toEqual(201);
    expect(setup_response_business.body._id).toBeDefined();

    // Make schedule request
    const response = await request(app)
        .post('/business/api/create/schedule/' + setup_response_business.body._id)
        .send({
            userID: 'notfound',
            workerID: 'notfound',
            scheduledTime: '11:00-11:50',
            date: '2020-11-03',
            serviceType: ['Service One']
        });

    expect(response.status).toEqual(404);

});