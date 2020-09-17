import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';

export const requireSuper = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("req.currentUser : ", req.currentUser)

  if (req.currentUser?.role!=='super') {
    throw new NotAuthorizedError();
  }
  next();
};
