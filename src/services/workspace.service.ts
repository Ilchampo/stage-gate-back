import type {
  IWorkspace,
  IWorkspaceCreateArgs,
  IWorkspaceUpdateArgs,
} from '@src/interfaces/workspace.interface';

import { generateUniqueCode } from '@src/utils/generateUniqueCode';
import { handleError } from '@src/utils/handleError';

import httpCodes from '@src/constants/httpCodes';
import CustomResponse from '@src/models/customResponse.model';
import prisma from '@src/config/database';

export const createWorkspaceService = async (
  args: IWorkspaceCreateArgs
): Promise<CustomResponse<IWorkspace>> => {
  const { name, description, repository, logo } = args;
  const code = generateUniqueCode();

  try {
    const response = await prisma.tblWorkspace.create({
      data: {
        name,
        description,
        repository,
        logo,
        code,
      },
    });

    return new CustomResponse(httpCodes.OK, response, undefined);
  } catch (error) {
    return handleError(error) as CustomResponse<IWorkspace>;
  }
};

export const getWorkspaceByIdService = async (
  id: string
): Promise<CustomResponse<IWorkspace | null>> => {
  try {
    const response = await prisma.tblWorkspace.findUnique({
      where: {
        id,
      },
    });

    if (!response) {
      return new CustomResponse(httpCodes.NOT_FOUND, null, undefined);
    }

    return new CustomResponse(httpCodes.OK, response, undefined);
  } catch (error) {
    return handleError(error) as CustomResponse<IWorkspace>;
  }
};

export const getAllWorkspacesService = async (): Promise<
  CustomResponse<IWorkspace[]>
> => {
  try {
    const response = await prisma.tblWorkspace.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return new CustomResponse(httpCodes.OK, response, undefined);
  } catch (error) {
    return handleError(error) as CustomResponse<IWorkspace[]>;
  }
};

export const updateWorkspaceByIdService = async (
  args: IWorkspaceUpdateArgs
): Promise<CustomResponse<IWorkspace>> => {
  const { id, name, description, repository, logo } = args;

  try {
    const response = await prisma.tblWorkspace.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        repository,
        logo,
      },
    });

    return new CustomResponse(httpCodes.OK, response, undefined);
  } catch (error) {
    return handleError(error) as CustomResponse<IWorkspace>;
  }
};

export const deleteWorkspaceByIdService = async (
  id: string
): Promise<CustomResponse<IWorkspace>> => {
  try {
    const response = await prisma.tblWorkspace.delete({
      where: {
        id,
      },
    });

    return new CustomResponse(httpCodes.OK, response, undefined);
  } catch (error) {
    return handleError(error) as CustomResponse<IWorkspace>;
  }
};
