import { prisma } from 'db';

/**
 * Adds a token to the revocation list in the database
 * @param {string} token - The JWT token to revoke
 * @returns {Promise<void>} Resolves when the token has been added to the revocation list
 */
export const addRevokeToken = async (token: string): Promise<void> => {
  await prisma.revokeToken.create({
    data: {
      token,
      revokedAt: new Date(),
    },
  });
};

/**
 * Checks if a token has been revoked by searching for it in the revocation list
 * @param {string} token - The JWT token to check
 * @returns {Promise<boolean>} True if the token is found in the revocation list, false otherwise
 */
export const isTokenRevoked = async (token: string): Promise<boolean> => {
  const revokeToken = await prisma.revokeToken.findUnique({
    where: { token },
  });
  if (revokeToken) return true;
  return false;
};
