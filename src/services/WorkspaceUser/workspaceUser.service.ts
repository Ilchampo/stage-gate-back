import type {
  IWorkspaceUser,
  IWorkspaceUserCreateArgs,
  IWorkspaceUserUpdateArgs,
} from '@src/services/WorkspaceUser/workspaceUser.interface';

import { createPlatformLogService } from '@src/services/PlatformLog/platformLog.service';
import { handleError } from '@src/helpers/handlerError';

import CustomResponse from '@src/models/customResponse.model';
import httpCodes from '@src/constants/httpCodes';
import responseCodes from '@src/constants/responseCodes';
import prisma from '@src/config/database';

export const createWorkspaceUserService = async (
  args: IWorkspaceUserCreateArgs
): Promise<CustomResponse<IWorkspaceUser | undefined>> => {
  const { userId, workspaceId, role } = args;

  try {
    const workspaceUser = await prisma.workspaceUser.findFirst({
      where: {
        userId,
        workspaceId,
      },
    });

    if (workspaceUser) {
      return new CustomResponse(
        httpCodes.CONFLICT,
        undefined,
        responseCodes.DUPLICATE_ENTRY
      );
    }

    const response = await prisma.workspaceUser.create({
      data: {
        userId,
        workspaceId,
        role,
      },
    });
    return new CustomResponse(httpCodes.CREATED, response, undefined);
  } catch (error) {
    await createPlatformLogService({ description: error as string });
    return handleError(error) as CustomResponse<IWorkspaceUser | undefined>;
  }
};

export const getWorkspaceUserByUserService = async (
  userId: string
): Promise<CustomResponse<IWorkspaceUser | undefined>> => {
  try {
    const response = await prisma.workspaceUser.findFirst({
      where: {
        userId,
      },
    });

    if (!response) {
      return new CustomResponse(
        httpCodes.NOT_FOUND,
        undefined,
        responseCodes.NOT_FOUND
      );
    }

    return new CustomResponse(httpCodes.OK, response, undefined);
  } catch (error) {
    await createPlatformLogService({ description: error as string });
    return handleError(error) as CustomResponse<IWorkspaceUser | undefined>;
  }
};

export const updateWorkspaceUserService = async (
  args: IWorkspaceUserUpdateArgs
): Promise<CustomResponse<IWorkspaceUser | undefined>> => {
  const { userId, workspaceId, role } = args;

  try {
    const workspaceUser = await prisma.workspaceUser.findFirst({
      where: {
        userId,
        workspaceId,
      },
    });

    if (!workspaceUser) {
      return new CustomResponse(
        httpCodes.NOT_FOUND,
        undefined,
        responseCodes.NOT_FOUND
      );
    }

    const response = await prisma.workspaceUser.update({
      where: {
        id: workspaceUser.id,
      },
      data: {
        role,
      },
    });
    return new CustomResponse(httpCodes.OK, response, undefined);
  } catch (error) {
    await createPlatformLogService({ description: error as string });
    return handleError(error) as CustomResponse<IWorkspaceUser | undefined>;
  }
};
