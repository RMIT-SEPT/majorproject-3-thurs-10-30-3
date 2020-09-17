import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { validateRequest, BadRequestError } from '../common';

import { Business } from '../models/business';
import { Schedule } from '../models/schedule';
import { currentUser, requireSuper, requireAdmin, requireAuth } from '../common';
import { ScheduleCreatedPublisher } from '../common/events/schedule-created-publisher'
import { ScheduleCanceledPublisher } from '../common/events/schedule-canceled-publisher'
import { natsWrapper } from '../nats-wrapper';
const router = express.Router();

//Endpoint to create schedule
router.post(
    '/api/business/create/schedule/:businessId', async (req: Request, res: Response) => {
        const { userId, workerId, scheduledTime, date, serviceType } = req.body;
        // user {name, email,phonenumber}, worekr {name}, scheduledTime,date, serviceType:[], totalMinute
        // var newSchedule = {
        //     userId,
        //     workerId,
        //     businessId: req.params.businessId,
        //     scheduledTime,
        //     date,
        //     serviceType
        // }

        var newSchedule = new Schedule({
            userId,
            workerId,
            businessId: req.params.businessId,
            scheduledTime,
            date,
            serviceType
        })

        var business = await Business.findById(req.params.businessId)

        console.log("newSchedule : ", newSchedule)
        business?.schedules.push(newSchedule)
        console.log("business.schedules : ", business?.schedules)
        await business?.save()

        new ScheduleCreatedPublisher(natsWrapper.client).publish(newSchedule);

        res.status(200).send(business);
    }
);


//Endpoint to cancel schedule
router.post(
    '/api/business/cancel/schedule/:businessId', requireAuth, async (req: Request, res: Response) => {
        const { scheduleId,userId } = req.body;

        var business = await Business.findById(req.params.businessId)

        if (business) {
            business.schedules = business?.schedules.filter((s, index) => {
                console.log(JSON.stringify(s._id) === JSON.stringify(scheduleId))
                if (JSON.stringify(s._id) === JSON.stringify(scheduleId)) {
                    return false
                } else {
                    return true
                }
            })
        } else {
            res.status(400).send({ errors: [{ message: "Business not found" }] });
        }

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
