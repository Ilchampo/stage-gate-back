import type {
  IPlatformFeature,
  IPlatformFeatureCreateArgs,
  IPlatformFeatureUpdateArgs,
} from '@src/interfaces/platformFeature.interface';

import { handleError } from '@src/utils/handleError';

import httpCodes from '@src/constants/httpCodes';
import CustomResponse from '@src/models/customResponse.model';
import prisma from '@src/config/database';

export const createPlatformFeatureService = async (
  args: IPlatformFeatureCreateArgs
): Promise<CustomResponse<IPlatformFeature>> => {
  const { feature, enabled } = args;
  try {
    const response = await prisma.tblPlatformFeature.create({
      data: {
        feature,
        enabled: enabled ?? false,
        createdOn: new Date(),
      },
    });

    return new CustomResponse(httpCodes.OK, response, undefined);
  } catch (error) {
    return handleError(error) as CustomResponse<IPlatformFeature>;
  }
};

export const getPlaformFeatureByIdService = async (
  id: string
): Promise<CustomResponse<IPlatformFeature | null>> => {
  try {
    const response = await prisma.tblPlatformFeature.findUnique({
      where: {
        id,
      },
    });

    if (!response) {
      return new CustomResponse(httpCodes.NOT_FOUND, null, undefined);
    }

    return new CustomResponse(httpCodes.OK, response, undefined);
  } catch (error) {
    return handleError(error) as CustomResponse<IPlatformFeature>;
  }
};

export const getAllPlatformFeaturesService = async (): Promise<
  CustomResponse<IPlatformFeature[]>
> => {
  try {
    const response = await prisma.tblPlatformFeature.findMany({
      orderBy: {
        feature: 'asc',
      },
    });

    return new CustomResponse(httpCodes.OK, response, undefined);
  } catch (error) {
    return handleError(error) as CustomResponse<IPlatformFeature[]>;
  }
};

export const updatePlatformFeatureByIdService = async (
  args: IPlatformFeatureUpdateArgs
): Promise<CustomResponse<IPlatformFeature>> => {
  const { id, feature, enabled } = args;
  try {
    const response = await prisma.tblPlatformFeature.update({
      where: {
        id,
      },
      data: {
        feature,
        enabled,
      },
    });

    return new CustomResponse(httpCodes.OK, response, undefined);
  } catch (error) {
    return handleError(error) as CustomResponse<IPlatformFeature>;
  }
};

export const deletePlatformFeatureByIdService = async (
  id: string
): Promise<CustomResponse<IPlatformFeature>> => {
  try {
    const response = await prisma.tblPlatformFeature.delete({
      where: {
        id,
      },
    });
    return new CustomResponse(httpCodes.OK, response, undefined);
  } catch (error) {
    return handleError(error) as CustomResponse<IPlatformFeature>;
  }
};
