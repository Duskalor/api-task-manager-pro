import config from 'config';
import type { NextFunction, Request, Response } from 'express';
import { verify, type JwtPayload } from 'jsonwebtoken';
import { isTokenRevoked } from 'models/revoke-token';

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload | string;
}

export const authenticateToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'No token provided' });
  } else {
    if (await isTokenRevoked(token)) {
      res.status(401).json({ message: 'Token revoked' });
    }
    try {
      const decoded = verify(token, config.JWT_SECRET);
      if (!decoded) res.status(401).json({ message: 'Invalid token' });
      req.user = decoded;
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: 'Invalid token' });
    }
  }
};
