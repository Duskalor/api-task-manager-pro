import type { Request, Response } from 'express';
import type { AuthenticatedRequest } from 'middelware/authentication';
import { addRevokeToken } from 'models/revoke-token';
import {
  createUser,
  getUserByEmail,
  revokeUserToken,
  userSchema,
} from 'models/user';
import { parse } from 'valibot';

export const userController = {
  async addUser(req: Request, res: Response) {
    const body = req.body;
    try {
      const result = parse(userSchema, body);
      const user = await createUser(result.email, result.password);
      res.status(201).json({
        data: user,
      });
    } catch (error) {
      console.log(error);
    }
  },
  async getUser(req: Request, res: Response) {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    try {
      const user = await getUserByEmail(email);
      res.status(200).json({
        data: user,
      });
    } catch (error) {
      console.log(error);
    }
  },
  async logout(req: Request, res: Response) {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      addRevokeToken(token);
      const formattedReq = req as AuthenticatedRequest;
      if (
        formattedReq.user &&
        typeof formattedReq.user === 'object' &&
        'id' in formattedReq.user
      ) {
        const result = await revokeUserToken(formattedReq.user.email);

        if (!result) {
          return res.status(401).json({ message: 'Forbidden' });
        }
        return res.status(200).json({ message: 'Logged out successfully' });
      }
    }
  },
};
