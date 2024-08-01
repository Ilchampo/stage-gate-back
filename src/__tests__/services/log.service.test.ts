import {
  createLogService,
  deleteAllLogsService,
  deleteLogByIdService,
  getAllLogsService,
  getLogByIdService,
  updateLogByIdService,
} from '@src/services/log.service';
import { handleError } from '@src/utils/handleError';
import {
  logArrayResponseMock,
  logCreateMock,
  logErrorMock,
  logResponseMock,
  logUpdateMock,
} from '@src/__mocks__/log.mocks';

import prisma from '@src/config/database';
import httpCodes from '@src/constants/httpCodes';
import CustomResponse from '@src/models/customResponse.model';

jest.mock('@src/config/database');
jest.mock('@src/utils/handleError');

describe('Test log.service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createLogService', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should create a log and return a success response', async () => {
      (prisma.tblLog.create as jest.Mock).mockResolvedValue(logResponseMock);

      const result = await createLogService(logCreateMock);

      expect(prisma.tblLog.create).toHaveBeenCalledWith({
        data: {
          description: 'Test log',
          createdOn: expect.any(Date),
        },
      });
      expect(result).toEqual(
        new CustomResponse(httpCodes.OK, logResponseMock, undefined)
      );
    });

    it('should handle errors and return an error response', async () => {
      (prisma.tblLog.create as jest.Mock).mockRejectedValue(logErrorMock);
      const mockHandleError = handleError as jest.Mock;
      mockHandleError.mockReturnValue(
        new CustomResponse(
          httpCodes.INTERNAL_SERVER_ERROR,
          undefined,
          'Log error'
        )
      );

      const result = await createLogService(logCreateMock);

      expect(prisma.tblLog.create).toHaveBeenCalled();
      expect(handleError).toHaveBeenCalledWith(logErrorMock);
      expect(result).toEqual(
        new CustomResponse(
          httpCodes.INTERNAL_SERVER_ERROR,
          undefined,
          'Log error'
        )
      );
    });
  });

  describe('getLogByIdService', () => {
    it('should return a log by ID', async () => {
      (prisma.tblLog.findUnique as jest.Mock).mockResolvedValue(
        logResponseMock
      );

      const result = await getLogByIdService('id-1');

      expect(prisma.tblLog.findUnique).toHaveBeenCalledWith({
        where: {
          id: 'id-1',
        },
      });
      expect(result).toEqual(
        new CustomResponse(httpCodes.OK, logResponseMock, undefined)
      );
    });

    it('should return not found if log does not exist', async () => {
      (prisma.tblLog.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await getLogByIdService('id-1');

      expect(prisma.tblLog.findUnique).toHaveBeenCalledWith({
        where: {
          id: 'id-1',
        },
      });
      expect(result).toEqual(
        new CustomResponse(httpCodes.NOT_FOUND, null, undefined)
      );
    });

    it('should handle errors and return an error response', async () => {
      (prisma.tblLog.findUnique as jest.Mock).mockRejectedValue(logErrorMock);
      const mockHandleError = handleError as jest.Mock;
      mockHandleError.mockReturnValue(
        new CustomResponse(
          httpCodes.INTERNAL_SERVER_ERROR,
          undefined,
          'Log error'
        )
      );

      const result = await getLogByIdService('id-1');

      expect(prisma.tblLog.findUnique).toHaveBeenCalled();
      expect(handleError).toHaveBeenCalledWith(logErrorMock);
      expect(result).toEqual(
        new CustomResponse(
          httpCodes.INTERNAL_SERVER_ERROR,
          undefined,
          'Log error'
        )
      );
    });
  });

  describe('getAllLogsService', () => {
    it('should return all logs', async () => {
      (prisma.tblLog.findMany as jest.Mock).mockResolvedValue(
        logArrayResponseMock
      );

      const result = await getAllLogsService();

      expect(prisma.tblLog.findMany).toHaveBeenCalledWith({
        orderBy: {
          createdOn: 'desc',
        },
      });
      expect(result).toEqual(
        new CustomResponse(httpCodes.OK, logArrayResponseMock, undefined)
      );
    });

    it('should handle errors and return an error response', async () => {
      (prisma.tblLog.findMany as jest.Mock).mockRejectedValue(logErrorMock);
      const mockHandleError = handleError as jest.Mock;
      mockHandleError.mockReturnValue(
        new CustomResponse(
          httpCodes.INTERNAL_SERVER_ERROR,
          undefined,
          'Log error'
        )
      );

      const result = await getAllLogsService();

      expect(prisma.tblLog.findMany).toHaveBeenCalled();
      expect(handleError).toHaveBeenCalledWith(logErrorMock);
      expect(result).toEqual(
        new CustomResponse(
          httpCodes.INTERNAL_SERVER_ERROR,
          undefined,
          'Log error'
        )
      );
    });
  });

  describe('updateLogByIdService', () => {
    it('should update a log and return a success response', async () => {
      (prisma.tblLog.update as jest.Mock).mockResolvedValue(logResponseMock);

      const result = await updateLogByIdService(logUpdateMock);

      expect(prisma.tblLog.update).toHaveBeenCalledWith({
        where: {
          id: 'id-1',
        },
        data: {
          description: 'Updated test log',
        },
      });
      expect(result).toEqual(
        new CustomResponse(httpCodes.OK, logResponseMock, undefined)
      );
    });

    it('should handle errors and return an error response', async () => {
      (prisma.tblLog.update as jest.Mock).mockRejectedValue(logErrorMock);
      const mockHandleError = handleError as jest.Mock;
      mockHandleError.mockReturnValue(
        new CustomResponse(
          httpCodes.INTERNAL_SERVER_ERROR,
          undefined,
          'Log error'
        )
      );

      const result = await updateLogByIdService(logUpdateMock);

      expect(prisma.tblLog.update).toHaveBeenCalled();
      expect(handleError).toHaveBeenCalledWith(logErrorMock);
      expect(result).toEqual(
        new CustomResponse(
          httpCodes.INTERNAL_SERVER_ERROR,
          undefined,
          'Log error'
        )
      );
    });
  });

  describe('deleteLogByIdService', () => {
    it('should delete a log and return a success response', async () => {
      (prisma.tblLog.delete as jest.Mock).mockResolvedValue(logResponseMock);

      const result = await deleteLogByIdService('id-1');

      expect(prisma.tblLog.delete).toHaveBeenCalledWith({
        where: {
          id: 'id-1',
        },
      });
      expect(result).toEqual(
        new CustomResponse(httpCodes.OK, logResponseMock, undefined)
      );
    });

    it('should handle errors and return an error response', async () => {
      (prisma.tblLog.delete as jest.Mock).mockRejectedValue(logErrorMock);
      const mockHandleError = handleError as jest.Mock;
      mockHandleError.mockReturnValue(
        new CustomResponse(
          httpCodes.INTERNAL_SERVER_ERROR,
          undefined,
          'Log error'
        )
      );

      const result = await deleteLogByIdService('id-1');

      expect(prisma.tblLog.delete).toHaveBeenCalled();
      expect(handleError).toHaveBeenCalledWith(logErrorMock);
      expect(result).toEqual(
        new CustomResponse(
          httpCodes.INTERNAL_SERVER_ERROR,
          undefined,
          'Log error'
        )
      );
    });
  });

  describe('deleteAllLogsService', () => {
    it('should delete all logs and return a success response', async () => {
      (prisma.tblLog.deleteMany as jest.Mock).mockResolvedValue({ count: 1 });

      const result = await deleteAllLogsService();

      expect(prisma.tblLog.deleteMany).toHaveBeenCalled();
      expect(result).toEqual(
        new CustomResponse(httpCodes.OK, undefined, undefined)
      );
    });

    it('should handle errors and return an error response', async () => {
      (prisma.tblLog.deleteMany as jest.Mock).mockRejectedValue(logErrorMock);
      const mockHandleError = handleError as jest.Mock;
      mockHandleError.mockReturnValue(
        new CustomResponse(
          httpCodes.INTERNAL_SERVER_ERROR,
          undefined,
          'Log error'
        )
      );

      const result = await deleteAllLogsService();

      expect(prisma.tblLog.deleteMany).toHaveBeenCalled();
      expect(handleError).toHaveBeenCalledWith(logErrorMock);
      expect(result).toEqual(
        new CustomResponse(
          httpCodes.INTERNAL_SERVER_ERROR,
          undefined,
          'Log error'
        )
      );
    });
  });
});
