import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';

export const requireSuper = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.currentUser?.role!=='super') {
    throw new NotAuthorizedError();
  }
  console.log("should not come here")
  next();
};
