import type { Request, Response } from 'express';
import type { AuthenticatedRequest } from 'middelware/authentication';
import { addRevokeToken } from 'models/revoke-token';
import { createUser, revokeUserToken, userSchema } from 'models/user';
import { parse } from 'valibot';

export const addUser = async (req: Request, res: Response) => {
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
};

export const login = async (req: Request, res: Response) => {
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
};

export const logout = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1];
  const authReq = req as AuthenticatedRequest;
  if (token) {
    await addRevokeToken(token);
    if (
      authReq.user &&
      typeof authReq.user === 'object' &&
      'id' in authReq.user
    ) {
      const result = await revokeUserToken(authReq.user.email);

      if (!result) {
        res.status(401).json({ message: 'Forbidden' });
      }
      res.status(200).json({ message: 'Logged out successfully' });
    }
  }
};
