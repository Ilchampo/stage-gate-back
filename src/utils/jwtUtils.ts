import type {
  IAuthGenerateTokenArgs,
  IAuthVerifyTokenArgs,
} from '@src/interfaces/auth.interface';

import jwt from 'jsonwebtoken';
import config from '@src/config/config';

export const generateToken = (args: IAuthGenerateTokenArgs): string => {
  const { firstName, lastName, email, role, exp } = args;

  const payload = {
    firstName,
    lastName,
    email,
    role,
    exp: Math.floor(exp.getTime() / 1000),
  };

  const token = jwt.sign(payload, config.encryptionKey);

  return token;
};

export const verifyToken = (
  args: IAuthVerifyTokenArgs
): string | jwt.JwtPayload => {
  const { token } = args;

  try {
    const decoded = jwt.verify(token, config.encryptionKey);
    return decoded;
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error(error.message);
    }
    throw new Error('Invalid token');
  }
};

export const decodeToken = (args: IAuthVerifyTokenArgs): jwt.Jwt | null => {
  const { token } = args;

  const decoded = jwt.decode(token, { complete: true });
  return decoded;
};
