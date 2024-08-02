import {
  createUserLoginService,
  getUserLoginByUserIdService,
  updateUserLoginByUserIdService,
  updateUserLoginPasswordByUserIdService,
  updateUserLoginRoleByUserIdService,
} from '@src/services/userLogin.service';
import { handleError } from '@src/utils/handleError';
import { encryptPassword } from '@src/utils/encryptionUtils';
import {
  userLoginCreateMock,
  userLoginErrorMock,
  userLoginResponseMock,
  userLoginUpdateMock,
  userLoginUpdatePasswordMock,
  userLoginUpdateRoleMock,
} from '@src/__mocks__/userLogin.mocks';

import prisma from '@src/config/database';
import httpCodes from '@src/constants/httpCodes';
import CustomResponse from '@src/models/customResponse.model';

jest.mock('@src/config/database');
jest.mock('@src/utils/handleError');
jest.mock('@src/utils/encryptionUtils');

describe('Test userLogin.service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createUserLoginService', () => {
    it('should create a user login and return a success response', async () => {
      (prisma.tblUserLogin.create as jest.Mock).mockResolvedValue(
        userLoginResponseMock
      );
      (encryptPassword as jest.Mock).mockResolvedValue('encryptedpassword123');

      const result = await createUserLoginService(userLoginCreateMock);

      expect(encryptPassword).toHaveBeenCalledWith('password123');
      expect(prisma.tblUserLogin.create).toHaveBeenCalledWith({
        data: {
          userId: 'user-1',
          password: 'encryptedpassword123',
          onBoarding: true,
          verifiedEmail: true,
          privacyPolicy: true,
          role: 'admin',
        },
      });
      expect(result).toEqual(
        new CustomResponse(httpCodes.OK, userLoginResponseMock, undefined)
      );
    });

    it('should handle errors and return an error response', async () => {
      (prisma.tblUserLogin.create as jest.Mock).mockRejectedValue(
        userLoginErrorMock
      );
      const mockHandleError = handleError as jest.Mock;
      mockHandleError.mockReturnValue(
        new CustomResponse(
          httpCodes.INTERNAL_SERVER_ERROR,
          undefined,
          'UserLogin error'
        )
      );

      const result = await createUserLoginService(userLoginCreateMock);

      expect(prisma.tblUserLogin.create).toHaveBeenCalled();
      expect(handleError).toHaveBeenCalledWith(userLoginErrorMock);
      expect(result).toEqual(
        new CustomResponse(
          httpCodes.INTERNAL_SERVER_ERROR,
          undefined,
          'UserLogin error'
        )
      );
    });
  });

  describe('getUserLoginByUserIdService', () => {
    it('should return a user login by user ID', async () => {
      (prisma.tblUserLogin.findFirst as jest.Mock).mockResolvedValue(
        userLoginResponseMock
      );

      const result = await getUserLoginByUserIdService('user-1');

      expect(prisma.tblUserLogin.findFirst).toHaveBeenCalledWith({
        where: { userId: 'user-1' },
      });
      expect(result).toEqual(
        new CustomResponse(httpCodes.OK, userLoginResponseMock, undefined)
      );
    });

    it('should return not found if user login does not exist', async () => {
      (prisma.tblUserLogin.findFirst as jest.Mock).mockResolvedValue(null);

      const result = await getUserLoginByUserIdService('user-1');

      expect(prisma.tblUserLogin.findFirst).toHaveBeenCalledWith({
        where: { userId: 'user-1' },
      });
      expect(result).toEqual(
        new CustomResponse(httpCodes.NOT_FOUND, null, undefined)
      );
    });

    it('should handle errors and return an error response', async () => {
      (prisma.tblUserLogin.findFirst as jest.Mock).mockRejectedValue(
        userLoginErrorMock
      );
      const mockHandleError = handleError as jest.Mock;
      mockHandleError.mockReturnValue(
        new CustomResponse(
          httpCodes.INTERNAL_SERVER_ERROR,
          undefined,
          'UserLogin error'
        )
      );

      const result = await getUserLoginByUserIdService('user-1');

      expect(prisma.tblUserLogin.findFirst).toHaveBeenCalled();
      expect(handleError).toHaveBeenCalledWith(userLoginErrorMock);
      expect(result).toEqual(
        new CustomResponse(
          httpCodes.INTERNAL_SERVER_ERROR,
          undefined,
          'UserLogin error'
        )
      );
    });
  });

  describe('updateUserLoginByUserIdService', () => {
    it('should update a user login and return a success response', async () => {
      (prisma.tblUserLogin.update as jest.Mock).mockResolvedValue(
        userLoginResponseMock
      );

      const result = await updateUserLoginByUserIdService(userLoginUpdateMock);

      expect(prisma.tblUserLogin.update).toHaveBeenCalledWith({
        where: { userId: 'user-1' },
        data: {
          onBoarding: false,
          verifiedEmail: true,
          privacyPolicy: false,
        },
      });
      expect(result).toEqual(
        new CustomResponse(httpCodes.OK, userLoginResponseMock, undefined)
      );
    });

    it('should handle errors and return an error response', async () => {
      (prisma.tblUserLogin.update as jest.Mock).mockRejectedValue(
        userLoginErrorMock
      );
      const mockHandleError = handleError as jest.Mock;
      mockHandleError.mockReturnValue(
        new CustomResponse(
          httpCodes.INTERNAL_SERVER_ERROR,
          undefined,
          'UserLogin error'
        )
      );

      const result = await updateUserLoginByUserIdService(userLoginUpdateMock);

      expect(prisma.tblUserLogin.update).toHaveBeenCalled();
      expect(handleError).toHaveBeenCalledWith(userLoginErrorMock);
      expect(result).toEqual(
        new CustomResponse(
          httpCodes.INTERNAL_SERVER_ERROR,
          undefined,
          'UserLogin error'
        )
      );
    });
  });

  describe('updateUserLoginPasswordByUserIdService', () => {
    it('should update a user login password and return a success response', async () => {
      (prisma.tblUserLogin.update as jest.Mock).mockResolvedValue(
        userLoginResponseMock
      );
      (encryptPassword as jest.Mock).mockResolvedValue('encryptedpassword123');

      const result = await updateUserLoginPasswordByUserIdService(
        userLoginUpdatePasswordMock
      );

      expect(encryptPassword).toHaveBeenCalledWith('newpassword123');
      expect(prisma.tblUserLogin.update).toHaveBeenCalledWith({
        where: { userId: 'user-1' },
        data: {
          password: 'encryptedpassword123',
        },
      });
      expect(result).toEqual(
        new CustomResponse(httpCodes.OK, userLoginResponseMock, undefined)
      );
    });

    it('should handle errors and return an error response', async () => {
      (prisma.tblUserLogin.update as jest.Mock).mockRejectedValue(
        userLoginErrorMock
      );
      const mockHandleError = handleError as jest.Mock;
      mockHandleError.mockReturnValue(
        new CustomResponse(
          httpCodes.INTERNAL_SERVER_ERROR,
          undefined,
          'UserLogin error'
        )
      );

      const result = await updateUserLoginPasswordByUserIdService(
        userLoginUpdatePasswordMock
      );

      expect(prisma.tblUserLogin.update).toHaveBeenCalled();
      expect(handleError).toHaveBeenCalledWith(userLoginErrorMock);
      expect(result).toEqual(
        new CustomResponse(
          httpCodes.INTERNAL_SERVER_ERROR,
          undefined,
          'UserLogin error'
        )
      );
    });
  });

  describe('updateUserLoginRoleByUserIdService', () => {
    it('should update a user login role and return a success response', async () => {
      (prisma.tblUserLogin.update as jest.Mock).mockResolvedValue(
        userLoginResponseMock
      );
      const result = await updateUserLoginRoleByUserIdService(
        userLoginUpdateRoleMock
      );

      expect(prisma.tblUserLogin.update).toHaveBeenCalledWith({
        where: { userId: 'user-1' },
        data: {
          role: 'manager',
        },
      });
      expect(result).toEqual(
        new CustomResponse(httpCodes.OK, userLoginResponseMock, undefined)
      );
    });

    it('should handle errors and return an error response', async () => {
      (prisma.tblUserLogin.update as jest.Mock).mockRejectedValue(
        userLoginErrorMock
      );
      const mockHandleError = handleError as jest.Mock;
      mockHandleError.mockReturnValue(
        new CustomResponse(
          httpCodes.INTERNAL_SERVER_ERROR,
          undefined,
          'UserLogin error'
        )
      );

      const result = await updateUserLoginRoleByUserIdService(
        userLoginUpdateRoleMock
      );

      expect(prisma.tblUserLogin.update).toHaveBeenCalled();
      expect(handleError).toHaveBeenCalledWith(userLoginErrorMock);
      expect(result).toEqual(
        new CustomResponse(
          httpCodes.INTERNAL_SERVER_ERROR,
          undefined,
          'UserLogin error'
        )
      );
    });
  });
});
