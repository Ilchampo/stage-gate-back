import type {
  ILog,
  ILogCreateArgs,
  ILogUpdateArgs,
} from '@src/interfaces/log.interface';

import { handleError } from '@src/utils/handleError';

import httpCodes from '@src/constants/httpCodes';
import CustomResponse from '@src/models/customResponse.model';
import prisma from '@src/config/database';

export const createLogService = async (
  args: ILogCreateArgs
): Promise<CustomResponse<ILog>> => {
  const { description } = args;

  try {
    const response = await prisma.tblLog.create({
      data: {
        description,
        createdOn: new Date(),
      },
    });

    return new CustomResponse(httpCodes.OK, response, undefined);
  } catch (error) {
    return handleError(error) as CustomResponse<ILog>;
  }
};

export const getLogByIdService = async (
  id: string
): Promise<CustomResponse<ILog | null>> => {
  try {
    const response = await prisma.tblLog.findUnique({
      where: {
        id,
      },
    });

    if (!response) {
      return new CustomResponse(httpCodes.NOT_FOUND, null, undefined);
    }

    return new CustomResponse(httpCodes.OK, response, undefined);
  } catch (error) {
    return handleError(error) as CustomResponse<ILog>;
  }
};

export const getAllLogsService = async (): Promise<CustomResponse<ILog[]>> => {
  try {
    const response = await prisma.tblLog.findMany({
      orderBy: {
        createdOn: 'desc',
      },
    });

    return new CustomResponse(httpCodes.OK, response, undefined);
  } catch (error) {
    return handleError(error) as CustomResponse<ILog[]>;
  }
};

export const updateLogByIdService = async (
  args: ILogUpdateArgs
): Promise<CustomResponse<ILog>> => {
  const { id, description } = args;

  try {
    const response = await prisma.tblLog.update({
      where: {
        id,
      },
      data: {
        description,
      },
    });

    return new CustomResponse(httpCodes.OK, response, undefined);
  } catch (error) {
    return handleError(error) as CustomResponse<ILog>;
  }
};

export const deleteLogByIdService = async (
  id: string
): Promise<CustomResponse<ILog>> => {
  try {
    const response = await prisma.tblLog.delete({
      where: {
        id,
      },
    });

    return new CustomResponse(httpCodes.OK, response, undefined);
  } catch (error) {
    return handleError(error) as CustomResponse<ILog>;
  }
};

export const deleteAllLogsService = async (): Promise<
  CustomResponse<undefined>
> => {
  try {
    await prisma.tblLog.deleteMany();
    return new CustomResponse(httpCodes.OK, undefined, undefined);
  } catch (error) {
    return handleError(error) as CustomResponse<undefined>;
  }
};
