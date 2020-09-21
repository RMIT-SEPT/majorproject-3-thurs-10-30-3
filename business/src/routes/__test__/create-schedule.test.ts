import request from 'supertest';
import { app } from '../../app';

// ADDING SCHEDULE

it('returns HTTP Error Code 404 (Not Found) when attempting to add to business that does not exist', async () => {

});

it('returns HTTP Error Code 201 (Created) for schedule creation', async () => {
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

    // worker must be created

    // user must be created

    const response = await request(app)
        .post('/business/api/create/schedule/' + setup_response_business.body._id)
        .send({
            userID: '',
            workerID: '',
            scheduledTime: '',
            date: '',
            serviceType: ''
        });

    expect(response.status).toEqual(201);

});