import type {
  IWorkspaceSetting,
  IWorkspaceSettingCreateArgs,
  IWorkspaceSettingUpdateArgs,
} from '@src/services/WorkspaceSetting/workspaceSetting.interface';

import { createPlatformLogService } from '@src/services/PlatformLog/platformLog.service';
import { handleError } from '@src/helpers/handlerError';

import CustomResponse from '@src/models/customResponse.model';
import httpCodes from '@src/constants/httpCodes';
import responseCodes from '@src/constants/responseCodes';
import prisma from '@src/config/database';

export const createWorkspaceSettingService = async (
  args: IWorkspaceSettingCreateArgs
): Promise<CustomResponse<IWorkspaceSetting | undefined>> => {
  const { workspaceId, maxManagers, maxCollaborators, featureReviewers } = args;

  try {
    const workspaceSetting = await prisma.workspaceSetting.findFirst({
      where: {
        workspaceId,
      },
    });

    if (!workspaceSetting) {
      return new CustomResponse(
        httpCodes.NOT_FOUND,
        undefined,
        responseCodes.WORKSPACE_SETTING_NOT_FOUND
      );
    }

    const response = await prisma.workspaceSetting.create({
      data: {
        workspaceId,
        maxManagers,
        maxCollaborators,
        featureReviewers,
      },
    });

    return new CustomResponse(httpCodes.CREATED, response, undefined);
  } catch (error) {
    await createPlatformLogService({ description: error as string });
    return handleError(error) as CustomResponse<IWorkspaceSetting | undefined>;
  }
};

export const getWorkspaceSettingService = async (
  workspaceId: string
): Promise<CustomResponse<IWorkspaceSetting | undefined>> => {
  try {
    const workspaceSetting = await prisma.workspaceSetting.findFirst({
      where: {
        workspaceId,
      },
    });

    if (!workspaceSetting) {
      return new CustomResponse(
        httpCodes.NOT_FOUND,
        undefined,
        responseCodes.WORKSPACE_SETTING_NOT_FOUND
      );
    }

    return new CustomResponse(httpCodes.OK, workspaceSetting, undefined);
  } catch (error) {
    await createPlatformLogService({ description: error as string });
    return handleError(error) as CustomResponse<IWorkspaceSetting | undefined>;
  }
};

export const updateWorkspaceSettingService = async (
  args: IWorkspaceSettingUpdateArgs
): Promise<CustomResponse<IWorkspaceSetting | undefined>> => {
  const { workspaceId, maxManagers, maxCollaborators, featureReviewers } = args;

  try {
    const workspaceSetting = await prisma.workspaceSetting.findFirst({
      where: {
        workspaceId,
      },
    });

    if (!workspaceSetting) {
      return new CustomResponse(
        httpCodes.NOT_FOUND,
        undefined,
        responseCodes.WORKSPACE_SETTING_NOT_FOUND
      );
    }

    const response = await prisma.workspaceSetting.update({
      where: {
        workspaceId,
      },
      data: {
        maxManagers: maxManagers ?? workspaceSetting.maxManagers,
        maxCollaborators: maxCollaborators ?? workspaceSetting.maxCollaborators,
        featureReviewers: featureReviewers ?? workspaceSetting.featureReviewers,
      },
    });

    return new CustomResponse(httpCodes.OK, response, undefined);
  } catch (error) {
    await createPlatformLogService({ description: error as string });
    return handleError(error) as CustomResponse<IWorkspaceSetting | undefined>;
  }
};
