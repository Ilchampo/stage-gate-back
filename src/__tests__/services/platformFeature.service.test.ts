import {
  createPlatformFeatureService,
  deletePlatformFeatureByIdService,
  getAllPlatformFeaturesService,
  getPlaformFeatureByIdService,
  updatePlatformFeatureByIdService,
} from '@src/services/platformFeature.service';
import { handleError } from '@src/utils/handleError';
import {
  platformFeatureArrayResponseMock,
  platformFeatureFalseResponseMock,
  platformFeatureCreateFeatureMock,
  platformFeatureCreateMock,
  platformFeatureErrorMock,
  platformFeatureResponseMock,
  platformFeatureUpdateMock,
} from '@src/__mocks__/platformFeature.mocks';

import prisma from '@src/config/database';
import httpCodes from '@src/constants/httpCodes';
import CustomResponse from '@src/models/customResponse.model';

jest.mock('@src/config/database');
jest.mock('@src/utils/handleError');

describe('Test platformFeature.service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createPlatformFeatureService', () => {
    it('should create a platform feature and return a success response', async () => {
      (prisma.tblPlatformFeature.create as jest.Mock).mockResolvedValue(
        platformFeatureResponseMock
      );

      const result = await createPlatformFeatureService(
        platformFeatureCreateMock
      );

      expect(prisma.tblPlatformFeature.create).toHaveBeenCalledWith({
        data: {
          feature: 'TEST-FEATURE',
          enabled: true,
          createdOn: expect.any(Date),
        },
      });
      expect(result).toEqual(
        new CustomResponse(httpCodes.OK, platformFeatureResponseMock, undefined)
      );
    });

    it('should create with enable as false when is not a enable param', async () => {
      (prisma.tblPlatformFeature.create as jest.Mock).mockResolvedValue(
        platformFeatureFalseResponseMock
      );

      const result = await createPlatformFeatureService(
        platformFeatureCreateFeatureMock
      );

      expect(prisma.tblPlatformFeature.create).toHaveBeenCalledWith({
        data: {
          feature: 'TEST-FEATURE',
          enabled: false,
          createdOn: expect.any(Date),
        },
      });
      expect(result).toEqual(
        new CustomResponse(
          httpCodes.OK,
          platformFeatureFalseResponseMock,
          undefined
        )
      );
    });

    it('should handle errors and return an error response', async () => {
      (prisma.tblPlatformFeature.create as jest.Mock).mockRejectedValue(
        platformFeatureErrorMock
      );
      const mockHandleError = handleError as jest.Mock;
      mockHandleError.mockReturnValue(
        new CustomResponse(
          httpCodes.INTERNAL_SERVER_ERROR,
          undefined,
          'Platform Feature error'
        )
      );

      const result = await createPlatformFeatureService(
        platformFeatureCreateMock
      );

      expect(prisma.tblPlatformFeature.create).toHaveBeenCalled();
      expect(handleError).toHaveBeenCalledWith(platformFeatureErrorMock);
      expect(result).toEqual(
        new CustomResponse(
          httpCodes.INTERNAL_SERVER_ERROR,
          undefined,
          'Platform Feature error'
        )
      );
    });
  });

  describe('getPlaformFeatureByIdService', () => {
    it('should return a platform feature by ID', async () => {
      (prisma.tblPlatformFeature.findUnique as jest.Mock).mockResolvedValue(
        platformFeatureResponseMock
      );

      const result = await getPlaformFeatureByIdService('feat-1');

      expect(prisma.tblPlatformFeature.findUnique).toHaveBeenCalledWith({
        where: { id: 'feat-1' },
      });
      expect(result).toEqual(
        new CustomResponse(httpCodes.OK, platformFeatureResponseMock, undefined)
      );
    });

    it('should return not found if platform feature does not exist', async () => {
      (prisma.tblPlatformFeature.findUnique as jest.Mock).mockResolvedValue(
        null
      );

      const result = await getPlaformFeatureByIdService('feat-1');

      expect(prisma.tblPlatformFeature.findUnique).toHaveBeenCalledWith({
        where: { id: 'feat-1' },
      });
      expect(result).toEqual(
        new CustomResponse(httpCodes.NOT_FOUND, null, undefined)
      );
    });

    it('should handle errors and return an error response', async () => {
      (prisma.tblPlatformFeature.findUnique as jest.Mock).mockRejectedValue(
        platformFeatureErrorMock
      );
      const mockHandleError = handleError as jest.Mock;
      mockHandleError.mockReturnValue(
        new CustomResponse(
          httpCodes.INTERNAL_SERVER_ERROR,
          undefined,
          'Platform Feature error'
        )
      );

      const result = await getPlaformFeatureByIdService('feat-1');

      expect(prisma.tblPlatformFeature.findUnique).toHaveBeenCalled();
      expect(handleError).toHaveBeenCalledWith(platformFeatureErrorMock);
      expect(result).toEqual(
        new CustomResponse(
          httpCodes.INTERNAL_SERVER_ERROR,
          undefined,
          'Platform Feature error'
        )
      );
    });
  });

  describe('getAllPlatformFeaturesService', () => {
    it('should return all platform features', async () => {
      (prisma.tblPlatformFeature.findMany as jest.Mock).mockResolvedValue(
        platformFeatureArrayResponseMock
      );

      const result = await getAllPlatformFeaturesService();

      expect(prisma.tblPlatformFeature.findMany).toHaveBeenCalledWith({
        orderBy: { feature: 'asc' },
      });
      expect(result).toEqual(
        new CustomResponse(
          httpCodes.OK,
          platformFeatureArrayResponseMock,
          undefined
        )
      );
    });

    it('should handle errors and return an error response', async () => {
      (prisma.tblPlatformFeature.findMany as jest.Mock).mockRejectedValue(
        platformFeatureErrorMock
      );
      const mockHandleError = handleError as jest.Mock;
      mockHandleError.mockReturnValue(
        new CustomResponse(
          httpCodes.INTERNAL_SERVER_ERROR,
          undefined,
          'Platform Feature error'
        )
      );

      const result = await getAllPlatformFeaturesService();

      expect(prisma.tblPlatformFeature.findMany).toHaveBeenCalled();
      expect(handleError).toHaveBeenCalledWith(platformFeatureErrorMock);
      expect(result).toEqual(
        new CustomResponse(
          httpCodes.INTERNAL_SERVER_ERROR,
          undefined,
          'Platform Feature error'
        )
      );
    });
  });

  describe('updatePlatformFeatureByIdService', () => {
    it('should update a platform feature and return a success response', async () => {
      (prisma.tblPlatformFeature.update as jest.Mock).mockResolvedValue(
        platformFeatureResponseMock
      );

      const result = await updatePlatformFeatureByIdService(
        platformFeatureUpdateMock
      );

      expect(prisma.tblPlatformFeature.update).toHaveBeenCalledWith({
        where: { id: 'feat-1' },
        data: {
          feature: 'TEST-FEATURE',
          enabled: true,
        },
      });
      expect(result).toEqual(
        new CustomResponse(httpCodes.OK, platformFeatureResponseMock, undefined)
      );
    });

    it('should handle errors and return an error response', async () => {
      (prisma.tblPlatformFeature.update as jest.Mock).mockRejectedValue(
        platformFeatureErrorMock
      );
      const mockHandleError = handleError as jest.Mock;
      mockHandleError.mockReturnValue(
        new CustomResponse(
          httpCodes.INTERNAL_SERVER_ERROR,
          undefined,
          'Platform Feature error'
        )
      );

      const result = await updatePlatformFeatureByIdService(
        platformFeatureUpdateMock
      );

      expect(prisma.tblPlatformFeature.update).toHaveBeenCalled();
      expect(handleError).toHaveBeenCalledWith(platformFeatureErrorMock);
      expect(result).toEqual(
        new CustomResponse(
          httpCodes.INTERNAL_SERVER_ERROR,
          undefined,
          'Platform Feature error'
        )
      );
    });
  });

  describe('deletePlatformFeatureByIdService', () => {
    it('should delete a platform feature and return a success response', async () => {
      (prisma.tblPlatformFeature.delete as jest.Mock).mockResolvedValue(
        platformFeatureResponseMock
      );

      const result = await deletePlatformFeatureByIdService('feat-1');

      expect(prisma.tblPlatformFeature.delete).toHaveBeenCalledWith({
        where: { id: 'feat-1' },
      });
      expect(result).toEqual(
        new CustomResponse(httpCodes.OK, platformFeatureResponseMock, undefined)
      );
    });

    it('should handle errors and return an error response', async () => {
      (prisma.tblPlatformFeature.delete as jest.Mock).mockRejectedValue(
        platformFeatureErrorMock
      );
      const mockHandleError = handleError as jest.Mock;
      mockHandleError.mockReturnValue(
        new CustomResponse(
          httpCodes.INTERNAL_SERVER_ERROR,
          undefined,
          'Platform Feature error'
        )
      );

      const result = await deletePlatformFeatureByIdService('feat-1');

      expect(prisma.tblPlatformFeature.delete).toHaveBeenCalled();
      expect(handleError).toHaveBeenCalledWith(platformFeatureErrorMock);
      expect(result).toEqual(
        new CustomResponse(
          httpCodes.INTERNAL_SERVER_ERROR,
          undefined,
          'Platform Feature error'
        )
      );
    });
  });
});
