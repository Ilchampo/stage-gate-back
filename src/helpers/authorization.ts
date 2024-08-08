import type { IAuthToken } from '../services/Auth/auth.interface';

import jwt from 'jsonwebtoken';
import config from '../config/config';

export const generateToken = (data: IAuthToken): string => {
  try {
    return jwt.sign(data, config.encryptionKey, { expiresIn: '1d' });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return error.message;
    }
    return error as string;
  }
};

export const verifyToken = (token: string): IAuthToken | string => {
  try {
    return jwt.verify(token, config.encryptionKey) as IAuthToken;
  } catch (error) {
    if (error instanceof SyntaxError) {
      return error.message;
    }
    return error as string;
  }
};

export const decodeToken = (token: string): IAuthToken | string => {
  try {
    return jwt.decode(token) as IAuthToken;
  } catch (error) {
    if (error instanceof SyntaxError) {
      return error.message;
    }
    return error as string;
  }
};
