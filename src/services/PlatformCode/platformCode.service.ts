import type {
  IPlatformCode,
  IPlatformCodeCreateArgs,
  IPlatformCodeUpdateArgs,
} from '@src/services/PlatformCode/platformCode.interface';

import { createPlatformLogService } from '@src/services/PlatformLog/platformLog.service';
import { handleError } from '@src/helpers/handlerError';

import CustomResponse from '@src/models/customResponse.model';
import httpCodes from '@src/constants/httpCodes';
import responseCodes from '@src/constants/responseCodes';
import prisma from '@src/config/database';

export const createPlatformCodeService = async (
  args: IPlatformCodeCreateArgs
): Promise<CustomResponse<IPlatformCode | undefined>> => {
  const { code, validUntilDate } = args;

  try {
    const platformCode = await prisma.platformCode.findFirst({
      where: {
        code,
      },
    });

    if (platformCode) {
      return new CustomResponse(
        httpCodes.CONFLICT,
        undefined,
        responseCodes.DUPLICATE_ENTRY
      );
    }

    const response = await prisma.platformCode.create({
      data: {
        code,
        validUntilDate: validUntilDate ?? new Date(),
      },
    });
    return new CustomResponse(httpCodes.CREATED, response, undefined);
  } catch (error) {
    await createPlatformLogService({ description: error as string });
    return handleError(error) as CustomResponse<IPlatformCode | undefined>;
  }
};

export const getPlatformCodeService = async (
  id: string
): Promise<CustomResponse<IPlatformCode | undefined>> => {
  try {
    const response = await prisma.platformCode.findUnique({
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
    return handleError(error) as CustomResponse<IPlatformCode | undefined>;
  }
};

export const getAllPlatformCodesService = async (): Promise<
  CustomResponse<IPlatformCode[] | undefined>
> => {
  try {
    const response = await prisma.platformCode.findMany({
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
    return handleError(error) as CustomResponse<IPlatformCode[] | undefined>;
  }
};

export const updatePlatformCodeService = async (
  args: IPlatformCodeUpdateArgs
): Promise<CustomResponse<IPlatformCode | undefined>> => {
  const { id, code, validUntilDate } = args;

  try {
    const platformCode = await prisma.platformCode.findUnique({
      where: {
        id,
      },
    });

    if (!platformCode) {
      return new CustomResponse(
        httpCodes.NOT_FOUND,
        undefined,
        responseCodes.NOT_FOUND
      );
    }

    const response = await prisma.platformCode.update({
      where: {
        id,
      },
      data: {
        code: code ?? platformCode.code,
        validUntilDate: validUntilDate ?? platformCode.validUntilDate,
      },
    });

    return new CustomResponse(httpCodes.OK, response, undefined);
  } catch (error) {
    await createPlatformLogService({ description: error as string });
    return handleError(error) as CustomResponse<IPlatformCode | undefined>;
  }
};

export const deletePlatformCodeService = async (
  id: string
): Promise<CustomResponse<IPlatformCode | undefined>> => {
  try {
    const platformCode = await prisma.platformCode.findUnique({
      where: {
        id,
      },
    });

    if (!platformCode) {
      return new CustomResponse(
        httpCodes.NOT_FOUND,
        undefined,
        responseCodes.NOT_FOUND
      );
    }

    await prisma.platformCode.delete({
      where: {
        id,
      },
    });

    return new CustomResponse(httpCodes.NO_CONTENT, undefined, undefined);
  } catch (error) {
    await createPlatformLogService({ description: error as string });
    return handleError(error) as CustomResponse<IPlatformCode | undefined>;
  }
};

export const validatePlatformCodeService = async (
  code?: string | null
): Promise<boolean> => {
  if (!code) {
    return false;
  }

  try {
    const platformCode = await prisma.platformCode.findFirst({
      where: {
        code,
      },
    });

    if (!platformCode) {
      return false;
    }

    return new Date(platformCode.validUntilDate) > new Date();
  } catch (error) {
    await createPlatformLogService({ description: error as string });
    return false;
  }
};
