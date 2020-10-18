import express, { Request, Response } from 'express';
import { body, check } from 'express-validator';
import { validateRequest, BadRequestError } from '../common';
import { User } from '../models/user';
import { requireSuper } from '../common';

const router = express.Router();

/*=========================================== 
Create admin account for particular business.
============================================*/
router.post(
  '/api/admin/signup', requireSuper,
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
    check('name').not().isEmpty().withMessage('Name must be provided'),
    check('address').not().isEmpty().withMessage('Address must be provided'),
    check('phone').not().isEmpty().withMessage('Phone must be provided'),
    check('businessId').not().isEmpty().withMessage('business id must be provided'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {

    const { email,name, password, address, phone,businessId } = req.body;

    const existingUser = await User.findOne({ email });

    // If user already exists, send bad request error.
    if (existingUser) {
      throw new BadRequestError('Email in use');
    }
    const user = User.build({ email,name, password, address, phone,role:'admin', businessId,shift:"",days:[] });
    await user.save();

    res.status(201).send(user);
  }
);

export { router as adminRouter };
