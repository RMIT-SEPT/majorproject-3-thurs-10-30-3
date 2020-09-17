import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';

export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.currentUser?.role!=='admin' && req.currentUser?.role!=='super') {
    throw new NotAuthorizedError();
  }

  next();
};
