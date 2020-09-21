import express, { Request, Response } from 'express';
import { body, check } from 'express-validator';
import jwt from 'jsonwebtoken';
import { validateRequest, BadRequestError } from '../common';

import { Business } from '../models/business';
import { currentUser, requireSuper, requireAdmin } from '../common';

const router = express.Router();
/*============================
Get the list of business.
=============================*/
router.get('/api/business', async (req: Request, res: Response) => {
  var businesses = await Business.find()
  res.status(200).send(businesses);
})

/*============================
Read particular business.
=============================*/
router.get('/api/business/:businessId', async (req: Request, res: Response) => {
  var businesses = await Business.findById(req.params.businessId)
  res.status(200).send(businesses);
})

/*============================
Create business.
=============================*/
router.post(
  '/api/business', requireSuper,
  [
    check('name').not().isEmpty().withMessage('Name must be provided'),
    check('serviceType').not().isEmpty().withMessage('Service type must be provided'),
    check('serviceProvided').not().isEmpty().isArray().withMessage('Service provided should be in array form')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { name, serviceType, serviceProvided } = req.body;

    var exist = await Business.find({ name })

    // If business already exists, send bad request error.
    if (exist.length > 0) {
      throw new BadRequestError('Business already exists');
    }

    // Create and save new business doc.
    const newBusiness = Business.build({ name, serviceType, serviceProvided });
    await newBusiness.save();
    res.status(201).send(newBusiness);
  }
);


export { router as businessRouter };
