import express, { Request, Response } from 'express';
import { body, check } from 'express-validator';
import { validateRequest, BadRequestError } from '../common';

import { User } from '../models/user';
const router = express.Router();

interface bodyPayload {
  email: string;
  name: string;
  secretKey: string;
  password: string;
}

/*============================== 
Create super admin account.
===============================*/
router.post(
  '/api/super/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
    body('name')
      .isLength({ min: 4, max: 20 })
      .withMessage('Name must be between 4 and 20 characters'),
    check('secretKey').not().isEmpty().withMessage('Secret key must be provided')
  ],
  validateRequest,
  async (req: Request, res: Response) => {

    const { email, name, password, secretKey } = req.body;

    // If scret key provided was wrong, send bad request error.
    if (secretKey !== "createsuper") {
      throw new BadRequestError('Wrong secret key provided');
    }

    const existingUser = await User.findOne({ email });

    // If user already exists, send bad request error.
    if (existingUser) {
      throw new BadRequestError('Email in use');
    }
    const user = User.build({ email, name, password, address: "super", phone: "super", role: 'admin', businessId: "", shift: "", days: [] });
    await user.save();

    res.status(201).send(user);
  }
);

export { router as superRouter };
