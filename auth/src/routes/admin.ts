import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { validateRequest, BadRequestError } from '../common';

import { Password } from '../services/password';
import { User } from '../models/user';
import { currentUser,requireSuper,requireAdmin } from '../common';

const router = express.Router();

router.post(
  '/api/admin/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }

    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );
    if (!passwordsMatch) {
      throw new BadRequestError('Invalid Credentials');
    }

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
        address: existingUser.address,
        phone: existingUser.phone,
        role: existingUser.role
      },
      process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(existingUser);
  }
);


router.post(
  '/api/admin/signup', requireSuper,
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {

    const { email,name, password, address, phone,businessId } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email in use');
    }
    const user = User.build({ email,name, password, address, phone,role:'admin', businessId,shift:"",days:[] });
    await user.save();
    console.log("new user in admin sign up : ", user)

    res.status(201).send(user);
  }
);

router.post('/api/admin/signout', (req, res) => {
  req.session = null;

  res.send({});
});

router.get('/api/admin/currentuser', requireAdmin, currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as adminRouter };
