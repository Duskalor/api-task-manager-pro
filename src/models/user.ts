import {
  email,
  minLength,
  object,
  pipe,
  string,
  type InferInput,
} from 'valibot';
import { compare, hash } from 'bcrypt';
import { prisma } from '../db';
import type { User } from '@prisma/client';

export const userSchema = object({
  email: pipe(string(), minLength(1), email()),
  password: pipe(string(), minLength(1)),
});

export type IUser = InferInput<typeof userSchema> & {
  id: string;
  token?: string;
  refreshToken?: string;
};

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

/**
 * Creates a new user in the database if one with the given email doesn't already exist
 * @param {string} email - The email address of the user to create
 * @param {string} password - The plain text password to hash and store
 * @returns {Promise<User>} The created or existing user object
 */
export const createUser = async (
  email: string,
  password: string
): Promise<User> => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (user) return user;

  const newUserData = await prisma.user.create({
    data: {
      email: email,
      password: await hash(password, 10),
      role: UserRole.USER,
    },
  });
  return newUserData;
};

/**
 * Retrieves a user by their email address
 * @param {string} email - The email address to search for
 * @returns {Promise<User|undefined>} The found user or undefined if not found
 */
export const getUserByEmail = async (email: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({ where: { email } });
  return user;
};

/**
 * Validates a user's password against the stored hash
 * @param {User} user - The user object containing the hashed password
 * @param {string} password - The plain text password to validate
 * @returns {Promise<boolean>} True if the password matches, false otherwise
 */
export const validatePassword = async (
  user: User,
  password: string
): Promise<boolean> => {
  return await compare(password, user.password);
};

/**
 * Revokes a user's authentication tokens by removing them from the database
 * @param {string} email - The email address of the user to revoke tokens for
 * @returns {Promise<boolean>} True if tokens were revoked, false if user wasn't found
 */
export const revokeUserToken = async (email: string): Promise<boolean> => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return false;

  await prisma.user.update({
    where: { email },
    data: {
      ...user,
      refreshToken: undefined,
    },
  });
  return true;
};
