import type { Request } from 'express';
import { userSchema } from 'models/user';
import { parse } from 'valibot';

export const userController = async (req: Request, res: Response) => {
  const body = req.body;
  const result = parse(userSchema, body);
};
