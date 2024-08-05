import type { IAuthVerifyTokenArgs } from '@src/interfaces/auth.interface';

import {
  jwtDecodedPayload,
  jwtGenerateTokenArgsMock,
  jwtTokenMock,
} from '@src/__mocks__/auth.mocks';
import { generateToken, verifyToken, decodeToken } from '@src/utils/jwtUtils';

import jwt from 'jsonwebtoken';
import config from '@src/config/config';

jest.mock('jsonwebtoken');
jest.mock('@src/config/config', () => ({
  encryptionKey: 'test-encryption-key',
}));

describe('jwtUtils', () => {
  const token = jwtTokenMock;

  describe('generateToken', () => {
    it('should generate a token', () => {
      (jwt.sign as jest.Mock).mockReturnValue(token);

      const result = generateToken(jwtGenerateTokenArgsMock);

      expect(jwt.sign).toHaveBeenCalledWith(
        {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@email.com',
          role: 'admin',
          exp: Math.floor(jwtGenerateTokenArgsMock.exp.getTime() / 1000),
        },
        config.encryptionKey
      );
      expect(result).toBe(token);
    });
  });

  describe('verifyToken', () => {
    it('should verify a token and return the decoded payload', () => {
      const args: IAuthVerifyTokenArgs = { token };

      (jwt.verify as jest.Mock).mockReturnValue(jwtDecodedPayload);

      const result = verifyToken(args);

      expect(jwt.verify).toHaveBeenCalledWith(token, config.encryptionKey);
      expect(result).toBe(jwtDecodedPayload);
    });

    it('should throw an error if the token is invalid', () => {
      const args: IAuthVerifyTokenArgs = { token };

      (jwt.verify as jest.Mock).mockImplementation(() => {
        throw new Error('Invalid token');
      });

      expect(() => verifyToken(args)).toThrow('Invalid token');
    });

    it('should throw a syntax error if the token has a syntax error', () => {
      const args: IAuthVerifyTokenArgs = { token };

      (jwt.verify as jest.Mock).mockImplementation(() => {
        throw new SyntaxError('Syntax error');
      });

      expect(() => verifyToken(args)).toThrow('Syntax error');
    });
  });

  describe('decodeToken', () => {
    it('should decode a token and return the decoded payload', () => {
      const args: IAuthVerifyTokenArgs = { token };
      const decodedJwt = {
        header: {},
        payload: jwtDecodedPayload,
        signature: 'signature',
      };

      (jwt.decode as jest.Mock).mockReturnValue(decodedJwt);

      const result = decodeToken(args);

      expect(jwt.decode).toHaveBeenCalledWith(token, { complete: true });
      expect(result).toBe(decodedJwt);
    });

    it('should return null if the token cannot be decoded', () => {
      const args: IAuthVerifyTokenArgs = { token };

      (jwt.decode as jest.Mock).mockReturnValue(null);

      const result = decodeToken(args);

      expect(jwt.decode).toHaveBeenCalledWith(token, { complete: true });
      expect(result).toBeNull();
    });
  });
});
