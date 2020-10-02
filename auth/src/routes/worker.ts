import express, { Request, Response } from 'express';
import { body, check } from 'express-validator';
import { validateRequest, BadRequestError } from '../common';

import { User } from '../models/user';
import {  requireAdmin } from '../common';
import { WorkerCreatedPublisher } from '../common/events/worker-created-publisher'
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

/*============================================ 
Create worker account for particular business.
=============================================*/
router.post(
  '/api/worker/signup',
  requireAdmin,
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
    check('name').not().isEmpty().withMessage('Name must be provided'),
    check('address').not().isEmpty().withMessage('Address must be provided'),
    check('phone').not().isEmpty().withMessage('Phone must be provided'),
    body('shift')
      .isLength({ min: 11, max: 11 })
      .withMessage('Shift is not in correct form 00:00-00:00'),
    check('days').not().isEmpty().isArray().withMessage('Days should be array form')
  ],
  validateRequest,
  async (req: Request, res: Response) => {

    const { email, name, password, address, phone, businessId, shift, days } = req.body;

    const existingUser = await User.findOne({ email });

    // If user already exists, send bad request error.
    if (existingUser) {
      throw new BadRequestError('Email in use');
    }
    const user = User.build({ email, name, password, address, phone, role: 'worker', businessId, shift, days });
    await user.save();

    // Publich worker created event.
    new WorkerCreatedPublisher(natsWrapper.client).publish({ userId: user._id, businessId: user.businessId });
    res.status(201).send(user);
  }
);

/*============================================ 
Editing working days and hours of worker.
=============================================*/
router.put(
  '/api/worker/:workerId',
  [
    body('shift')
      .isLength({ min: 11, max: 11 })
      .withMessage('Shift is not in correct form 00:00-00:00'),
    check('name').not().isEmpty().withMessage('Name must be provided'),
    check('address').not().isEmpty().withMessage('Address must be provided'),
    check('phone').not().isEmpty().withMessage('Phone must be provided'),
    check('days').not().isEmpty().isArray().withMessage('Days should be array form')
  ],
  validateRequest,
  requireAdmin,
  async (req: Request, res: Response) => {

    const {name, address, phone,  days, shift } = req.body;
    const worker = await User.findOne({ _id: req.params.workerId });

    // If worker does not exists, send bad request error.
    if (!worker) {
      throw new BadRequestError('Worker not found');
    }

    // Assign new working days and shft.
    worker.name = name
    worker.address = address
    worker.phone = phone
    worker.shift = shift
    worker.days = days

    await worker.save();

    res.status(201).send(worker);
  }
);


export { router as workerRouter };
