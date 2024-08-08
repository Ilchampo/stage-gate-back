import type {
  IUser,
  IUserCreateArgs,
  IUserUpdateArgs,
} from '@src/services/User/user.interface';

import { createPlatformLogService } from '@src/services/PlatformLog/platformLog.service';
import { handleError } from '@src/helpers/handlerError';

import CustomResponse from '@src/models/customResponse.model';
import httpCodes from '@src/constants/httpCodes';
import responseCodes from '@src/constants/responseCodes';
import prisma from '@src/config/database';

export const createUserService = async (
  args: IUserCreateArgs
): Promise<CustomResponse<IUser | undefined>> => {
  const { firstname, lastname, email, avatar } = args;

  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (user) {
      return new CustomResponse(
        httpCodes.CONFLICT,
        undefined,
        responseCodes.DUPLICATE_ENTRY
      );
    }

    const response = await prisma.user.create({
      data: {
        firstname,
        lastname,
        email,
        avatar,
      },
    });

    return new CustomResponse(httpCodes.CREATED, response, undefined);
  } catch (error) {
    await createPlatformLogService({ description: error as string });
    return handleError(error) as CustomResponse<IUser | undefined>;
  }
};

export const getUserByEmailService = async (
  email: string
): Promise<CustomResponse<IUser | undefined>> => {
  try {
    const response = await prisma.user.findUnique({
      where: {
        email,
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
    return handleError(error) as CustomResponse<IUser | undefined>;
  }
};

export const getUserService = async (
  id: string
): Promise<CustomResponse<IUser | undefined>> => {
  try {
    const response = await prisma.user.findUnique({
      where: {
        id,
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
    return handleError(error) as CustomResponse<IUser | undefined>;
  }
};

export const getUsersByWorkspaceIdService = async (
  workspaceId: string
): Promise<CustomResponse<IUser[] | undefined>> => {
  try {
    const response = await prisma.user.findMany({
      where: {
        workspaceUsers: {
          some: {
            workspaceId,
          },
        },
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
    return handleError(error) as CustomResponse<IUser[] | undefined>;
  }
};

export const updateUserService = async (
  args: IUserUpdateArgs
): Promise<CustomResponse<IUser | undefined>> => {
  const { id, firstname, lastname, email, avatar } = args;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return new CustomResponse(
        httpCodes.NOT_FOUND,
        undefined,
        responseCodes.NOT_FOUND
      );
    }

    const response = await prisma.user.update({
      where: {
        id,
      },
      data: {
        firstname,
        lastname,
        email,
        avatar,
      },
    });

    return new CustomResponse(httpCodes.OK, response, undefined);
  } catch (error) {
    await createPlatformLogService({ description: error as string });
    return handleError(error) as CustomResponse<IUser | undefined>;
  }
};

export const deleteUserService = async (
  id: string
): Promise<CustomResponse<IUser | undefined>> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return new CustomResponse(
        httpCodes.NOT_FOUND,
        undefined,
        responseCodes.NOT_FOUND
      );
    }

    const response = await prisma.user.delete({
      where: {
        id,
      },
    });

    return new CustomResponse(httpCodes.OK, response, undefined);
  } catch (error) {
    await createPlatformLogService({ description: error as string });
    return handleError(error) as CustomResponse<IUser | undefined>;
  }
};
