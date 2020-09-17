import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { validateRequest, BadRequestError } from '../common';

import { Business } from '../models/business';
import { currentUser, requireSuper, requireAdmin } from '../common';

const router = express.Router();

router.get('/api/business', async (req: Request, res: Response) => {
  console.log('/api/business come hree')
  var businesses = await Business.find()
  res.status(200).send(businesses);
})

router.get('/api/business/:businessId', async (req: Request, res: Response) => {
  var businesses = await Business.findById(req.params.businessId)
  res.status(200).send(businesses);
})


router.post(
  '/api/business', requireSuper, async (req: Request, res: Response) => {
    const { name, serviceType, serviceProvided } = req.body;

    var exist = await Business.find({ name })
    if (exist.length > 0) {
      throw new BadRequestError('Business already exists');
    }

    if (serviceProvided?.length === 0) {
      res.status(400).send({ errors: [{ message: "Please specify services you are providing" }] });
    }

    const newBusiness = Business.build({ name, serviceType, serviceProvided });
    await newBusiness.save();
    res.status(200).send(newBusiness);
  }
);


export { router as businessRouter };
