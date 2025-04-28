import type { Request } from 'express';
import { createUser, userSchema } from 'models/user';
import { parse } from 'valibot';

export const userController = async (req: Request, res: Response) => {
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
