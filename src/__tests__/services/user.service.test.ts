import {
  createUserService,
  deleteUserByIdService,
  getAllUsersService,
  getUserByIdService,
  updateUserByIdService,
} from '@src/services/user.service';
import { handleError } from '@src/utils/handleError';
import {
  userArrayResponseMock,
  userCreateMock,
  userErrorMock,
  userResponseMock,
  userUpdateMock,
} from '@src/__mocks__/user.mocks';

import prisma from '@src/config/database';
import httpCodes from '@src/constants/httpCodes';
import CustomResponse from '@src/models/customResponse.model';

jest.mock('@src/config/database');
jest.mock('@src/utils/handleError');

describe('Test user.service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createUserService', () => {
    it('should create a user and return a success response', async () => {
      (prisma.tblUser.create as jest.Mock).mockResolvedValue(userResponseMock);

      const result = await createUserService(userCreateMock);

      expect(prisma.tblUser.create).toHaveBeenCalledWith({
        data: userCreateMock,
      });
      expect(result).toEqual(
        new CustomResponse(httpCodes.OK, userResponseMock, undefined)
      );
    });

    it('should handle errors and return an error response', async () => {
      (prisma.tblUser.create as jest.Mock).mockRejectedValue(userErrorMock);
      const mockHandleError = handleError as jest.Mock;
      mockHandleError.mockReturnValue(
        new CustomResponse(
          httpCodes.INTERNAL_SERVER_ERROR,
          undefined,
          'User error'
        )
      );
      const result = await createUserService(userCreateMock);
      expect(prisma.tblUser.create).toHaveBeenCalled();
      expect(handleError).toHaveBeenCalledWith(userErrorMock);
      expect(result).toEqual(
        new CustomResponse(
          httpCodes.INTERNAL_SERVER_ERROR,
          undefined,
          'User error'
        )
      );
    });
  });

  describe('getUserByIdService', () => {
    it('should return a user by ID', async () => {
      (prisma.tblUser.findUnique as jest.Mock).mockResolvedValue(
        userResponseMock
      );

      const result = await getUserByIdService('user-1');

      expect(prisma.tblUser.findUnique).toHaveBeenCalledWith({
        where: { id: 'user-1' },
      });
      expect(result).toEqual(
        new CustomResponse(httpCodes.OK, userResponseMock, undefined)
      );
    });

    it('should return not found if user does not exist', async () => {
      (prisma.tblUser.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await getUserByIdService('user-1');

      expect(prisma.tblUser.findUnique).toHaveBeenCalledWith({
        where: { id: 'user-1' },
      });
      expect(result).toEqual(
        new CustomResponse(httpCodes.NOT_FOUND, null, undefined)
      );
    });

    it('should handle errors and return an error response', async () => {
      (prisma.tblUser.findUnique as jest.Mock).mockRejectedValue(userErrorMock);
      const mockHandleError = handleError as jest.Mock;
      mockHandleError.mockReturnValue(
        new CustomResponse(
          httpCodes.INTERNAL_SERVER_ERROR,
          undefined,
          'User error'
        )
      );

      const result = await getUserByIdService('user-1');

      expect(prisma.tblUser.findUnique).toHaveBeenCalled();
      expect(handleError).toHaveBeenCalledWith(userErrorMock);
      expect(result).toEqual(
        new CustomResponse(
          httpCodes.INTERNAL_SERVER_ERROR,
          undefined,
          'User error'
        )
      );
    });
  });

  describe('getAllUsersService', () => {
    it('should return all users', async () => {
      (prisma.tblUser.findMany as jest.Mock).mockResolvedValue(
        userArrayResponseMock
      );

      const result = await getAllUsersService();

      expect(prisma.tblUser.findMany).toHaveBeenCalledWith({
        orderBy: { firstName: 'asc' },
      });
      expect(result).toEqual(
        new CustomResponse(httpCodes.OK, userArrayResponseMock, undefined)
      );
    });

    it('should handle errors and return an error response', async () => {
      (prisma.tblUser.findMany as jest.Mock).mockRejectedValue(userErrorMock);
      const mockHandleError = handleError as jest.Mock;
      mockHandleError.mockReturnValue(
        new CustomResponse(
          httpCodes.INTERNAL_SERVER_ERROR,
          undefined,
          'User error'
        )
      );

      const result = await getAllUsersService();

      expect(prisma.tblUser.findMany).toHaveBeenCalled();
      expect(handleError).toHaveBeenCalledWith(userErrorMock);
      expect(result).toEqual(
        new CustomResponse(
          httpCodes.INTERNAL_SERVER_ERROR,
          undefined,
          'User error'
        )
      );
    });
  });

  describe('updateUserByIdService', () => {
    it('should update a user and return a success response', async () => {
      (prisma.tblUser.update as jest.Mock).mockResolvedValue(userResponseMock);

      const result = await updateUserByIdService(userUpdateMock);

      expect(prisma.tblUser.update).toHaveBeenCalledWith({
        where: { id: 'user-1' },
        data: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@email.com',
          avatar: userUpdateMock.avatar,
        },
      });
      expect(result).toEqual(
        new CustomResponse(httpCodes.OK, userResponseMock, undefined)
      );
    });
    it('should handle errors and return an error response', async () => {
      (prisma.tblUser.update as jest.Mock).mockRejectedValue(userErrorMock);
      const mockHandleError = handleError as jest.Mock;
      mockHandleError.mockReturnValue(
        new CustomResponse(
          httpCodes.INTERNAL_SERVER_ERROR,
          undefined,
          'User error'
        )
      );

      const result = await updateUserByIdService(userUpdateMock);

      expect(prisma.tblUser.update).toHaveBeenCalled();
      expect(handleError).toHaveBeenCalledWith(userErrorMock);
      expect(result).toEqual(
        new CustomResponse(
          httpCodes.INTERNAL_SERVER_ERROR,
          undefined,
          'User error'
        )
      );
    });
  });

  describe('deleteUserByIdService', () => {
    it('should delete a user and return a success response', async () => {
      (prisma.tblUser.delete as jest.Mock).mockResolvedValue(userResponseMock);
      const result = await deleteUserByIdService('user-1');

      expect(prisma.tblUser.delete).toHaveBeenCalledWith({
        where: { id: 'user-1' },
      });
      expect(result).toEqual(
        new CustomResponse(httpCodes.OK, userResponseMock, undefined)
      );
    });

    it('should handle errors and return an error response', async () => {
      (prisma.tblUser.delete as jest.Mock).mockRejectedValue(userErrorMock);
      const mockHandleError = handleError as jest.Mock;
      mockHandleError.mockReturnValue(
        new CustomResponse(
          httpCodes.INTERNAL_SERVER_ERROR,
          undefined,
          'User error'
        )
      );

      const result = await deleteUserByIdService('user-1');

      expect(prisma.tblUser.delete).toHaveBeenCalled();
      expect(handleError).toHaveBeenCalledWith(userErrorMock);
      expect(result).toEqual(
        new CustomResponse(
          httpCodes.INTERNAL_SERVER_ERROR,
          undefined,
          'User error'
        )
      );
    });
  });
});
