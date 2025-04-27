import type { NextFunction, Response } from 'express';
import type { AuthenticatedRequest } from './authentication';
import type { User } from '@prisma/client';

export const authorizeRoles = (roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userRoles = (req.user as User).role;

    if (userRoles && roles.includes(userRoles)) {
      next();
    } else {
      res.status(401).json({ message: 'Forbidden' });
    }
  };
};
