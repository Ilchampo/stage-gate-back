import {
  createWorkspaceService,
  deleteWorkspaceByIdService,
  getAllWorkspacesService,
  getWorkspaceByIdService,
  updateWorkspaceByIdService,
} from '@src/services/workspace.service';
import { generateUniqueCode } from '@src/utils/generateUniqueCode';
import { handleError } from '@src/utils/handleError';
import {
  logoBuffer,
  workspaceArrayResponseMock,
  workspaceCreateMock,
  workspaceErrorMock,
  workspaceResponseMock,
  workspaceUpdateMock,
} from '@src/__mocks__/workspace.mocks';

import prisma from '@src/config/database';
import httpCodes from '@src/constants/httpCodes';
import CustomResponse from '@src/models/customResponse.model';

jest.mock('@src/config/database');
jest.mock('@src/utils/handleError');
jest.mock('@src/utils/generateUniqueCode');

describe('Test workspace.service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createWorkspaceService', () => {
    it('should create a workspace and return a success response', async () => {
      (prisma.tblWorkspace.create as jest.Mock).mockResolvedValue(
        workspaceResponseMock
      );
      (generateUniqueCode as jest.Mock).mockReturnValue('ABC123XYZ');

      const result = await createWorkspaceService(workspaceCreateMock);

      expect(prisma.tblWorkspace.create).toHaveBeenCalledWith({
        data: {
          name: 'Test Workspace',
          description: 'A test workspace',
          repository: 'https://github.com/test-repo',
          logo: logoBuffer,
          code: 'ABC123XYZ',
        },
      });
      expect(result).toEqual(
        new CustomResponse(httpCodes.OK, workspaceResponseMock, undefined)
      );
    });

    it('should handle errors and return an error response', async () => {
      (prisma.tblWorkspace.create as jest.Mock).mockRejectedValue(
        workspaceErrorMock
      );
      const mockHandleError = handleError as jest.Mock;
      mockHandleError.mockReturnValue(
        new CustomResponse(
          httpCodes.INTERNAL_SERVER_ERROR,
          undefined,
          'Workspace error'
        )
      );

      const result = await createWorkspaceService(workspaceCreateMock);

      expect(prisma.tblWorkspace.create).toHaveBeenCalled();
      expect(handleError).toHaveBeenCalledWith(workspaceErrorMock);
      expect(result).toEqual(
        new CustomResponse(
          httpCodes.INTERNAL_SERVER_ERROR,
          undefined,
          'Workspace error'
        )
      );
    });
  });

  describe('getWorkspaceByIdService', () => {
    it('should return a workspace by ID', async () => {
      (prisma.tblWorkspace.findUnique as jest.Mock).mockResolvedValue(
        workspaceResponseMock
      );

      const result = await getWorkspaceByIdService('ws-1');

      expect(prisma.tblWorkspace.findUnique).toHaveBeenCalledWith({
        where: { id: 'ws-1' },
      });
      expect(result).toEqual(
        new CustomResponse(httpCodes.OK, workspaceResponseMock, undefined)
      );
    });

    it('should return not found if workspace does not exist', async () => {
      (prisma.tblWorkspace.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await getWorkspaceByIdService('ws-1');

      expect(prisma.tblWorkspace.findUnique).toHaveBeenCalledWith({
        where: { id: 'ws-1' },
      });
      expect(result).toEqual(
        new CustomResponse(httpCodes.NOT_FOUND, null, undefined)
      );
    });

    it('should handle errors and return an error response', async () => {
      (prisma.tblWorkspace.findUnique as jest.Mock).mockRejectedValue(
        workspaceErrorMock
      );
      const mockHandleError = handleError as jest.Mock;
      mockHandleError.mockReturnValue(
        new CustomResponse(
          httpCodes.INTERNAL_SERVER_ERROR,
          undefined,
          'Workspace error'
        )
      );

      const result = await getWorkspaceByIdService('ws-1');

      expect(prisma.tblWorkspace.findUnique).toHaveBeenCalled();
      expect(handleError).toHaveBeenCalledWith(workspaceErrorMock);
      expect(result).toEqual(
        new CustomResponse(
          httpCodes.INTERNAL_SERVER_ERROR,
          undefined,
          'Workspace error'
        )
      );
    });
  });

  describe('getAllWorkspacesService', () => {
    it('should return all workspaces', async () => {
      (prisma.tblWorkspace.findMany as jest.Mock).mockResolvedValue(
        workspaceArrayResponseMock
      );

      const result = await getAllWorkspacesService();

      expect(prisma.tblWorkspace.findMany).toHaveBeenCalledWith({
        orderBy: { name: 'asc' },
      });
      expect(result).toEqual(
        new CustomResponse(httpCodes.OK, workspaceArrayResponseMock, undefined)
      );
    });

    it('should handle errors and return an error response', async () => {
      (prisma.tblWorkspace.findMany as jest.Mock).mockRejectedValue(
        workspaceErrorMock
      );
      const mockHandleError = handleError as jest.Mock;
      mockHandleError.mockReturnValue(
        new CustomResponse(
          httpCodes.INTERNAL_SERVER_ERROR,
          undefined,
          'Workspace error'
        )
      );

      const result = await getAllWorkspacesService();

      expect(prisma.tblWorkspace.findMany).toHaveBeenCalled();
      expect(handleError).toHaveBeenCalledWith(workspaceErrorMock);
      expect(result).toEqual(
        new CustomResponse(
          httpCodes.INTERNAL_SERVER_ERROR,
          undefined,
          'Workspace error'
        )
      );
    });
  });

  describe('updateWorkspaceByIdService', () => {
    it('should update a workspace and return a success response', async () => {
      (prisma.tblWorkspace.update as jest.Mock).mockResolvedValue(
        workspaceResponseMock
      );

      const result = await updateWorkspaceByIdService(workspaceUpdateMock);

      expect(prisma.tblWorkspace.update).toHaveBeenCalledWith({
        where: { id: 'ws-1' },
        data: {
          name: 'Updated Workspace',
          description: 'An updated test workspace',
          repository: 'https://github.com/updated-repo',
          logo: logoBuffer,
        },
      });
      expect(result).toEqual(
        new CustomResponse(httpCodes.OK, workspaceResponseMock, undefined)
      );
    });

    it('should handle errors and return an error response', async () => {
      (prisma.tblWorkspace.update as jest.Mock).mockRejectedValue(
        workspaceErrorMock
      );
      const mockHandleError = handleError as jest.Mock;
      mockHandleError.mockReturnValue(
        new CustomResponse(
          httpCodes.INTERNAL_SERVER_ERROR,
          undefined,
          'Workspace error'
        )
      );

      const result = await updateWorkspaceByIdService(workspaceUpdateMock);

      expect(prisma.tblWorkspace.update).toHaveBeenCalled();
      expect(handleError).toHaveBeenCalledWith(workspaceErrorMock);
      expect(result).toEqual(
        new CustomResponse(
          httpCodes.INTERNAL_SERVER_ERROR,
          undefined,
          'Workspace error'
        )
      );
    });
  });

  describe('deleteWorkspaceByIdService', () => {
    it('should delete a workspace and return a success response', async () => {
      (prisma.tblWorkspace.delete as jest.Mock).mockResolvedValue(
        workspaceResponseMock
      );

      const result = await deleteWorkspaceByIdService('ws-1');

      expect(prisma.tblWorkspace.delete).toHaveBeenCalledWith({
        where: { id: 'ws-1' },
      });
      expect(result).toEqual(
        new CustomResponse(httpCodes.OK, workspaceResponseMock, undefined)
      );
    });

    it('should handle errors and return an error response', async () => {
      (prisma.tblWorkspace.delete as jest.Mock).mockRejectedValue(
        workspaceErrorMock
      );
      const mockHandleError = handleError as jest.Mock;
      mockHandleError.mockReturnValue(
        new CustomResponse(
          httpCodes.INTERNAL_SERVER_ERROR,
          undefined,
          'Workspace error'
        )
      );
      const result = await deleteWorkspaceByIdService('ws-1');

      expect(prisma.tblWorkspace.delete).toHaveBeenCalled();
      expect(handleError).toHaveBeenCalledWith(workspaceErrorMock);
      expect(result).toEqual(
        new CustomResponse(
          httpCodes.INTERNAL_SERVER_ERROR,
          undefined,
          'Workspace error'
        )
      );
    });
  });
});
