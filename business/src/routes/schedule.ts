import express, { Request, Response } from 'express';
import { body, check } from 'express-validator';
import jwt from 'jsonwebtoken';
import { validateRequest, BadRequestError } from '../common';

import { Business } from '../models/business';
import { Schedule } from '../models/schedule';
import { currentUser, requireSuper, requireAdmin, requireAuth } from '../common';
import { ScheduleCreatedPublisher } from '../common/events/schedule-created-publisher'
import { ScheduleCanceledPublisher } from '../common/events/schedule-canceled-publisher'
import { natsWrapper } from '../nats-wrapper';
const router = express.Router();


/*============================
Endpoint to create schedule.
=============================*/
router.post(
    '/api/business/create/schedule/:businessId',
    [
        check('userId').not().isEmpty().withMessage('User id must be provided'),
        check('workerId').not().isEmpty().withMessage('Worker id must be provided'),
        check('scheduledTime').not().isEmpty().withMessage('Scheduled time must be provided'),
        check('date').not().isEmpty().withMessage('Date must be provided'),
        check('serviceType').not().isEmpty().isArray().withMessage('Service type should be in array form')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { userId, workerId, scheduledTime, date, serviceType } = req.body;

        var newSchedule = new Schedule({
            userId,
            workerId,
            businessId: req.params.businessId,
            scheduledTime,
            date,
            serviceType
        })

        var business = await Business.findById(req.params.businessId)

        // If business does not exist, send bad request error.
        if (!business) {
            throw new BadRequestError('Business does not exist');
        }

        business?.schedules.push(newSchedule)
        await business?.save()

        //Publich schedule created event.
        new ScheduleCreatedPublisher(natsWrapper.client).publish(newSchedule);
        res.status(200).send(business);
    }
);

/*============================
Endpoint to cancel schedule.
=============================*/
router.post(
    '/api/business/cancel/schedule/:businessId',
    [
        check('userId').not().isEmpty().withMessage('User id must be provided'),
        check('scheduleId').not().isEmpty().withMessage('Schedule id must be provided'),
    ],
    validateRequest,
    requireAuth, async (req: Request, res: Response) => {
        const { scheduleId, userId } = req.body;

        var business = await Business.findById(req.params.businessId)
        // If business does not exist, send bad request error.
        if (!business) {
            throw new BadRequestError('Business does not exist');

        }

        business.schedules = business?.schedules.filter((s, index) => {
            console.log(JSON.stringify(s._id) === JSON.stringify(scheduleId))
            if (JSON.stringify(s._id) === JSON.stringify(scheduleId)) {
                return false
            } else {
                return true
            }
        })

        await business?.save()

        // Publish an event saying that an order was created
        new ScheduleCanceledPublisher(natsWrapper.client).publish({
            scheduleId,
            userId
        });


        res.status(200).send(business);
    }
);


export { router as scheduleRouter };
