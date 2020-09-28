import express, { Request, Response } from 'express';
import { body, check } from 'express-validator';
import jwt from 'jsonwebtoken';
import { validateRequest, BadRequestError, NotAuthorizedError } from '../common';

import { Password } from '../services/password';
import { User } from '../models/user';
import { currentUser } from '../common';

const router = express.Router();

/*=============== 
User sign in
================*/
router.post(
  '/api/users/signin',
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

    // If user email does not exists, send bad request error.
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }

    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );

    // If password does not match, send bad request error.
    if (!passwordsMatch) {
      throw new BadRequestError('Invalid Credentials');
    }

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        address: existingUser.address,
        phone: existingUser.phone,
        role: existingUser.role,
        shfit: existingUser.shift,
        businessId: existingUser.businessId,
        schedules: existingUser.schedules,
        days: existingUser.days
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

/*=============== 
User sign up
================*/
router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
    check('name').not().isEmpty().withMessage('Name must be provided'),
    check('address').not().isEmpty().withMessage('Address must be provided'),
    check('phone').not().isEmpty().withMessage('Phone must be provided'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, name, password, address, phone } = req.body;

    const existingUser = await User.findOne({ email });

    // If user already exists, send bad request error.
    if (existingUser) {
      throw new BadRequestError('Email in use');
    }

    const user = User.build({ email, name, password, address, phone, role: 'user', shift: "", businessId: "", days: [] });
    await user.save();

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
        address: user.address,
        phone: user.phone,
        role: user.role,
        shfit: user.shift,
        businessId: user.businessId,

      },
      process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

/*=============== 
User sign out
================*/
router.post('/api/users/signout', (req, res) => {

  // Empty cookie session
  req.session = null;
  res.status(200).send({});
});

/*=============== 
Read user data
================*/
router.get('/api/user/:userId', currentUser, async (req, res) => {
  const existingUser = await User.findById(req.params.userId);

  // If user does not exist, send bad request error.
  if (!existingUser) {
    throw new BadRequestError('User not found');
  }

  res.send(existingUser)

});


/*=============================== 
Read current user from cookie
================================*/
router.get('/api/users/currentuser', currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});


/*=============================== 
Read user data
================================*/
router.get('/api/user', currentUser, async (req, res) => {

  var user = await User.findById(req.currentUser.id)
  if (!user) {
    throw new BadRequestError("User is not found")
  }

  res.send({ currentUser: user });

});

export { router as authRouter };
