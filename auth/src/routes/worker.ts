import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { validateRequest, BadRequestError } from '../common';

import { Password } from '../services/password';
import { User } from '../models/user';
import { currentUser, requireSuper, requireAdmin } from '../common';
import { WorkerCreatedPublisher } from '../common/events/worker-created-publisher'
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

// Create worker account for specific business.
router.post(
  '/api/worker/signup', requireAdmin,
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {

    const { email, name, password, address, phone, businessId, shift, days } = req.body;

    const existingUser = await User.findOne({ email });
    console.log("existingUser : ", existingUser)

    if (existingUser) {
      throw new BadRequestError('Email in use');
    }
    const user = User.build({ email, name, password, address, phone, role: 'worker', businessId, shift, days });
    console.log("user : ", user)
    await user.save();
    console.log("new user in worekr sign up : ", user)


    new WorkerCreatedPublisher(natsWrapper.client).publish({ userId: user._id, businessId: user.businessId });

    res.status(201).send(user);
  }
);

// Editing working days and hours of worker.
router.put(
  '/api/worker/:workerId', requireAdmin,
  async (req: Request, res: Response) => {
    console.log("/worker/signup")

    const { name, address, phone, days, shift } = req.body;

    const worker = await User.findOne({ _id: req.params.workerId });

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
