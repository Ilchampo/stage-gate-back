import {
  signUpService,
  signInService,
  refreshTokenService,
} from '@src/services/auth.service';
import {
  createUserService,
  deleteUserByIdService,
} from '@src/services/user.service';
import { createUserLoginService } from '@src/services/userLogin.service';
import { verifyPassword } from '@src/utils/encryptionUtils';
import { generateToken, verifyToken, decodeToken } from '@src/utils/jwtUtils';
import { handleError } from '@src/utils/handleError';
import { UserRole } from '@prisma/client';

import httpCodes from '@src/constants/httpCodes';
import CustomResponse from '@src/models/customResponse.model';
import prisma from '@src/config/database';

jest.mock('@src/services/user.service');
jest.mock('@src/services/userLogin.service');
jest.mock('@src/utils/encryptionUtils');
jest.mock('@src/utils/jwtUtils');
jest.mock('@src/config/database');
jest.mock('@src/utils/handleError');

describe('Auth Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('signUpService', () => {
    const args = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password',
      avatar: Buffer.from('avatar.png'),
      role: 'collaborator' as UserRole,
    };

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should successfully sign up a user', async () => {
      const user = {
        id: 'user-id',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
      };
      const userLogin = { role: 'collaborator' };
      const token = 'jwt-token';

      (createUserService as jest.Mock).mockResolvedValue(
        new CustomResponse(httpCodes.OK, user, undefined)
      );
      (createUserLoginService as jest.Mock).mockResolvedValue(
        new CustomResponse(httpCodes.OK, userLogin, undefined)
      );
      (generateToken as jest.Mock).mockReturnValue(token);

      const result = await signUpService(args);

      expect(createUserService).toHaveBeenCalledWith({
        firstName: args.firstName,
        lastName: args.lastName,
        email: args.email,
        avatar: args.avatar,
      });

      expect(createUserLoginService).toHaveBeenCalledWith({
        userId: user.id,
        password: args.password,
        onBoarding: false,
        verifiedEmail: false,
        privacyPolicy: true,
        role: args.role,
      });

      expect(generateToken).toHaveBeenCalledWith({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: userLogin.role,
        exp: expect.any(Date),
      });

      expect(result).toEqual(
        new CustomResponse(httpCodes.OK, token, undefined)
      );
    });

    it('should return an error if user creation fails', async () => {
      (createUserService as jest.Mock).mockResolvedValue(
        new CustomResponse(
          httpCodes.INTERNAL_SERVER_ERROR,
          null,
          'User creation failed'
        )
      );

      const result = await signUpService(args);

      expect(result).toEqual(
        new CustomResponse(
          httpCodes.INTERNAL_SERVER_ERROR,
          null,
          'User creation failed'
        )
      );
    });

    it('should return an error if user service returns an error', async () => {
      (createUserService as jest.Mock).mockResolvedValue(
        new CustomResponse(httpCodes.OK, null, 'User creation error')
      );

      const result = await signUpService(args);

      expect(result).toEqual(
        new CustomResponse(httpCodes.OK, null, 'User creation error')
      );
    });

    it('should return an error if user data is not found', async () => {
      (createUserService as jest.Mock).mockResolvedValue(
        new CustomResponse(httpCodes.OK, null, undefined)
      );

      const result = await signUpService(args);

      expect(result).toEqual(
        new CustomResponse(httpCodes.NOT_FOUND, null, undefined)
      );
    });

    it('should return an error if user login creation fails and delete the user', async () => {
      const user = {
        id: 'user-id',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
      };

      (createUserService as jest.Mock).mockResolvedValue(
        new CustomResponse(httpCodes.OK, user, undefined)
      );
      (createUserLoginService as jest.Mock).mockResolvedValue(
        new CustomResponse(
          httpCodes.INTERNAL_SERVER_ERROR,
          null,
          'User login creation failed'
        )
      );

      const result = await signUpService(args);

      expect(deleteUserByIdService).toHaveBeenCalledWith(user.id);
      expect(result).toEqual(
        new CustomResponse(
          httpCodes.INTERNAL_SERVER_ERROR,
          null,
          'User login creation failed'
        )
      );
    });

    it('should handle unexpected errors', async () => {
      const error = new Error('Unexpected error');
      (createUserService as jest.Mock).mockRejectedValue(error);
      (handleError as jest.Mock).mockReturnValue(
        new CustomResponse(
          httpCodes.INTERNAL_SERVER_ERROR,
          null,
          'Unexpected error'
        )
      );

      const result = await signUpService(args);

      expect(handleError).toHaveBeenCalledWith(error);
      expect(result).toEqual(
        new CustomResponse(
          httpCodes.INTERNAL_SERVER_ERROR,
          null,
          'Unexpected error'
        )
      );
    });
  });

  describe('signInService', () => {
    const args = {
      email: 'john.doe@example.com',
      password: 'password',
    };

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should successfully sign in a user', async () => {
      const user = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        UserLogin: [{ password: 'hashed-password', role: 'collaborator' }],
      };
      const token = 'jwt-token';

      (prisma.tblUser.findUnique as jest.Mock).mockResolvedValue(user);
      (verifyPassword as jest.Mock).mockResolvedValue(true);
      (generateToken as jest.Mock).mockReturnValue(token);

      const result = await signInService(args);

      expect(prisma.tblUser.findUnique).toHaveBeenCalledWith({
        where: { email: args.email },
        include: { UserLogin: true },
      });

      expect(verifyPassword).toHaveBeenCalledWith(
        args.password,
        user.UserLogin[0].password
      );
      expect(generateToken).toHaveBeenCalledWith({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.UserLogin[0].role,
        exp: expect.any(Date),
      });

      expect(result).toEqual(
        new CustomResponse(httpCodes.OK, token, undefined)
      );
    });

    it('should return an error if user is not found', async () => {
      (prisma.tblUser.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await signInService(args);

      expect(result).toEqual(
        new CustomResponse(httpCodes.NOT_FOUND, null, 'User not found')
      );
    });

    it('should return an error if password is invalid', async () => {
      const user = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        UserLogin: [{ password: 'hashed-password', role: 'collaborator' }],
      };

      (prisma.tblUser.findUnique as jest.Mock).mockResolvedValue(user);
      (verifyPassword as jest.Mock).mockResolvedValue(false);

      const result = await signInService(args);

      expect(verifyPassword).toHaveBeenCalledWith(
        args.password,
        user.UserLogin[0].password
      );
      expect(result).toEqual(
        new CustomResponse(httpCodes.UNAUTHORIZED, null, 'Invalid password')
      );
    });

    it('should handle unexpected errors', async () => {
      const error = new Error('Unexpected error');
      (prisma.tblUser.findUnique as jest.Mock).mockRejectedValue(error);
      (handleError as jest.Mock).mockReturnValue(
        new CustomResponse(
          httpCodes.INTERNAL_SERVER_ERROR,
          null,
          'Unexpected error'
        )
      );

      const result = await signInService(args);

      expect(handleError).toHaveBeenCalledWith(error);
      expect(result).toEqual(
        new CustomResponse(
          httpCodes.INTERNAL_SERVER_ERROR,
          null,
          'Unexpected error'
        )
      );
    });
  });

  describe('refreshTokenService', () => {
    it('should refresh a token and return a new token', async () => {
      const token = 'valid-token';
      const decodedToken = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@email.com',
        role: 'collaborator',
        exp: Math.floor(Date.now() / 1000) + 3600,
      };
      const user = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@email.com',
        UserLogin: [{ role: 'collaborator' }],
      };

      (verifyToken as jest.Mock).mockReturnValue(decodedToken);
      (decodeToken as jest.Mock).mockReturnValue(decodedToken);
      (prisma.tblUser.findUnique as jest.Mock).mockResolvedValue(user);
      (generateToken as jest.Mock).mockReturnValue('new-token');

      const result = await refreshTokenService(token);

      expect(verifyToken).toHaveBeenCalledWith({ token });
      expect(decodeToken).toHaveBeenCalledWith({ token });
      expect(prisma.tblUser.findUnique).toHaveBeenCalledWith({
        where: { email: 'john.doe@email.com' },
        include: { UserLogin: true },
      });
      expect(generateToken).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@email.com',
        role: 'collaborator',
        exp: expect.any(Date),
      });
      expect(result).toEqual(
        new CustomResponse(httpCodes.OK, 'new-token', null)
      );
    });

    it('should return an error if token is invalid', async () => {
      const token = 'invalid-token';

      (verifyToken as jest.Mock).mockReturnValue(undefined);

      const result = await refreshTokenService(token);

      expect(verifyToken).toHaveBeenCalledWith({ token });
      expect(result).toEqual(
        new CustomResponse(
          httpCodes.UNAUTHORIZED,
          null,
          'Invalid or expired token'
        )
      );
    });

    it('should return an error if user is not found', async () => {
      const token = 'valid-token';
      const decodedToken = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@email.com',
        role: 'collaborator',
        exp: Math.floor(Date.now() / 1000) + 3600,
      };

      (verifyToken as jest.Mock).mockReturnValue(decodedToken);
      (decodeToken as jest.Mock).mockReturnValue(decodedToken);
      (prisma.tblUser.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await refreshTokenService(token);

      expect(verifyToken).toHaveBeenCalledWith({ token });
      expect(decodeToken).toHaveBeenCalledWith({ token });
      expect(prisma.tblUser.findUnique).toHaveBeenCalledWith({
        where: { email: decodedToken.email },
        include: { UserLogin: true },
      });
      expect(result).toEqual(
        new CustomResponse(httpCodes.NOT_FOUND, null, 'User not found')
      );
    });

    it('should handle errors in refreshTokenService', async () => {
      const token = 'valid-token';
      const error = new Error('Something went wrong');

      (verifyToken as jest.Mock).mockImplementation(() => {
        throw error;
      });

      const result = await refreshTokenService(token);

      expect(handleError).toHaveBeenCalledWith(error);
      expect(result).toEqual(handleError(error));
    });
  });
});
