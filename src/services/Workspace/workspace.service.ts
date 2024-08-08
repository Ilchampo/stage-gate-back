import type {
  IWorkspace,
  IWorkspaceCreateArgs,
  IWorkspaceUpdateArgs,
} from './workspace.interface';

import { createPlatformLogService } from '../PlatformLog/platformLog.service';
import { generateUniqueCode } from '../../helpers/generators';
import { handleError } from '../../helpers/handlerError';

import CustomResponse from '../../models/customResponse.model';
import httpCodes from '../../constants/httpCodes';
import responseCodes from '../../constants/responseCodes';
import prisma from '../../config/database';

export const validateWorkspaceCodeService = async (
  code: string
): Promise<boolean> => {
  try {
    const workspace = await prisma.workspace.findFirst({
      where: {
        code,
      },
    });

    return !!workspace;
  } catch (error) {
    await createPlatformLogService({ description: error as string });
    return false;
  }
};

export const createWorkspaceService = async (
  args: IWorkspaceCreateArgs
): Promise<CustomResponse<IWorkspace | undefined>> => {
  const { name, description, repository, logo } = args;
  let code: string;
  let isValidCode: boolean;

  try {
    do {
      code = generateUniqueCode();
      isValidCode = await validateWorkspaceCodeService(code);
    } while (!isValidCode);

    const workspace = await prisma.workspace.create({
      data: {
        name,
        description,
        repository,
        logo,
        code,
      },
    });

    return new CustomResponse(httpCodes.CREATED, workspace, undefined);
  } catch (error) {
    await createPlatformLogService({ description: error as string });
    return handleError(error) as CustomResponse<IWorkspace | undefined>;
  }
};

export const getWorkspaceService = async (
  id: string
): Promise<CustomResponse<IWorkspace | undefined>> => {
  try {
    const workspace = await prisma.workspace.findUnique({
      where: {
        id,
      },
    });

    if (!workspace) {
      return new CustomResponse(
        httpCodes.NOT_FOUND,
        undefined,
        responseCodes.NOT_FOUND
      );
    }

    return new CustomResponse(httpCodes.OK, workspace, undefined);
  } catch (error) {
    await createPlatformLogService({ description: error as string });
    return handleError(error) as CustomResponse<IWorkspace | undefined>;
  }
};

export const getWorkspacesByUserService = async (
  userId: string
): Promise<CustomResponse<IWorkspace[] | undefined>> => {
  try {
    const userWorkspaces = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        workspaceUsers: {
          select: {
            workspace: true,
          },
        },
      },
    });

    const workspaces =
      userWorkspaces?.workspaceUsers.map(
        (workspaceUser) => workspaceUser.workspace
      ) ?? [];

    if (!workspaces) {
      return new CustomResponse(
        httpCodes.NOT_FOUND,
        undefined,
        responseCodes.NOT_FOUND
      );
    }

    return new CustomResponse(httpCodes.OK, workspaces, undefined);
  } catch (error) {
    await createPlatformLogService({ description: error as string });
    return handleError(error) as CustomResponse<IWorkspace[] | undefined>;
  }
};

export const updateWorkspaceService = async (
  args: IWorkspaceUpdateArgs
): Promise<CustomResponse<IWorkspace | undefined>> => {
  const { id, name, description, repository, logo } = args;
  try {
    const workspace = await prisma.workspace.findUnique({
      where: {
        id,
      },
    });

    if (!workspace) {
      return new CustomResponse(
        httpCodes.NOT_FOUND,
        undefined,
        responseCodes.NOT_FOUND
      );
    }

    const response = await prisma.workspace.update({
      where: {
        id,
      },
      data: {
        name: name ?? workspace.name,
        description: description ?? workspace.description,
        repository: repository ?? workspace.repository,
        logo: logo ?? workspace.logo,
      },
    });

    return new CustomResponse(httpCodes.OK, response, undefined);
  } catch (error) {
    await createPlatformLogService({ description: error as string });
    return handleError(error) as CustomResponse<IWorkspace | undefined>;
  }
};

export const deleteWorkspaceService = async (
  id: string
): Promise<CustomResponse<IWorkspace | undefined>> => {
  try {
    const workspace = await prisma.workspace.findUnique({
      where: {
        id,
      },
    });

    if (!workspace) {
      return new CustomResponse(
        httpCodes.NOT_FOUND,
        undefined,
        responseCodes.NOT_FOUND
      );
    }

    await prisma.workspace.delete({
      where: {
        id,
      },
    });

    return new CustomResponse(httpCodes.NO_CONTENT, undefined, undefined);
  } catch (error) {
    await createPlatformLogService({ description: error as string });
    return handleError(error) as CustomResponse<IWorkspace | undefined>;
  }
};
