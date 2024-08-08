import type {
  IPlatformLog,
  IPlatformLogCreateArgs,
} from '@src/services/PlatformLog/platformLog.interface';

import { handleError } from '@src/helpers/handlerError';

import CustomResponse from '@src/models/customResponse.model';
import httpCodes from '@src/constants/httpCodes';
import responseCodes from '@src/constants/responseCodes';
import prisma from '@src/config/database';

export const createPlatformLogService = async (
  args: IPlatformLogCreateArgs
): Promise<CustomResponse<IPlatformLog | undefined>> => {
  const { description } = args;

  try {
    const response = await prisma.platformLog.create({
      data: {
        description,
        createdOn: new Date(),
      },
    });

    return new CustomResponse(httpCodes.CREATED, response, undefined);
  } catch (error) {
    return handleError(error) as CustomResponse<IPlatformLog | undefined>;
  }
};

export const getPlatformLogService = async (
  id: string
): Promise<CustomResponse<IPlatformLog | undefined>> => {
  try {
    const response = await prisma.platformLog.findUnique({
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
    return handleError(error) as CustomResponse<IPlatformLog | undefined>;
  }
};

export const getAllPlatformLogsService = async (): Promise<
  CustomResponse<IPlatformLog[] | undefined>
> => {
  try {
    const response = await prisma.platformLog.findMany({
      orderBy: {
        createdOn: 'desc',
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
    return handleError(error) as CustomResponse<IPlatformLog[] | undefined>;
  }
};

export const deleteAllPlatformLogsService = async (): Promise<
  CustomResponse<boolean>
> => {
  try {
    await prisma.platformLog.deleteMany();

    return new CustomResponse(httpCodes.NO_CONTENT, true, undefined);
  } catch (error) {
    await createPlatformLogService({ description: error as string });
    return handleError(error) as CustomResponse<boolean>;
  }
};
