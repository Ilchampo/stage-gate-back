import type {
  IPlatformFeature,
  IPlatformFeatureCreateArgs,
  IPlatformFeatureUpdateArgs,
} from '@src/services/PlatformFeature/platformFeature.interface';

import { createPlatformLogService } from '@src/services/PlatformLog/platformLog.service';
import { handleError } from '@src/helpers/handlerError';

import CustomResponse from '@src/models/customResponse.model';
import httpCodes from '@src/constants/httpCodes';
import responseCodes from '@src/constants/responseCodes';
import prisma from '@src/config/database';

export const createPlatformFeatureService = async (
  args: IPlatformFeatureCreateArgs
): Promise<CustomResponse<IPlatformFeature | undefined>> => {
  const { feature, enabled } = args;

  try {
    const response = await prisma.platformFeature.create({
      data: {
        feature,
        enabled,
        updatedOn: new Date(),
      },
    });

    return new CustomResponse(httpCodes.CREATED, response, undefined);
  } catch (error) {
    await createPlatformLogService({ description: error as string });
    return handleError(error) as CustomResponse<IPlatformFeature | undefined>;
  }
};

export const getPlatformFeatureService = async (
  id: string
): Promise<CustomResponse<IPlatformFeature | undefined>> => {
  try {
    const response = await prisma.platformFeature.findUnique({
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
    return handleError(error) as CustomResponse<IPlatformFeature | undefined>;
  }
};

export const getAllPlatformFeaturesService = async (): Promise<
  CustomResponse<IPlatformFeature[] | undefined>
> => {
  try {
    const response = await prisma.platformFeature.findMany();

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
    return handleError(error) as CustomResponse<IPlatformFeature[] | undefined>;
  }
};

export const updatePlatformFeatureService = async (
  args: IPlatformFeatureUpdateArgs
): Promise<CustomResponse<IPlatformFeature | undefined>> => {
  const { id, feature, enabled } = args;
  try {
    const platformFeature = await prisma.platformFeature.findUnique({
      where: {
        id,
      },
    });

    if (!platformFeature) {
      return new CustomResponse(
        httpCodes.NOT_FOUND,
        undefined,
        responseCodes.NOT_FOUND
      );
    }

    const response = await prisma.platformFeature.update({
      where: {
        id,
      },
      data: {
        feature,
        enabled,
        updatedOn: new Date(),
      },
    });

    return new CustomResponse(httpCodes.OK, response, undefined);
  } catch (error) {
    await createPlatformLogService({ description: error as string });
    return handleError(error) as CustomResponse<IPlatformFeature | undefined>;
  }
};

export const deletePlatformFeatureService = async (
  id: string
): Promise<CustomResponse<IPlatformFeature | undefined>> => {
  try {
    const platformFeature = await prisma.platformFeature.findUnique({
      where: {
        id,
      },
    });

    if (!platformFeature) {
      return new CustomResponse(
        httpCodes.NOT_FOUND,
        undefined,
        responseCodes.NOT_FOUND
      );
    }

    const response = await prisma.platformFeature.delete({
      where: {
        id,
      },
    });

    return new CustomResponse(httpCodes.OK, response, undefined);
  } catch (error) {
    await createPlatformLogService({ description: error as string });
    return handleError(error) as CustomResponse<IPlatformFeature | undefined>;
  }
};
