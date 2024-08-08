import type {
  IUserLogin,
  IUserLoginCreateArgs,
  IUserLoginUpdateArgs,
  IUserLoginUpdatePassword,
} from '@src/services/UserLogin/userLogin.interface';

import { validatePlatformCodeService } from '../PlatformCode/platformCode.service';
import { createPlatformLogService } from '@src/services/PlatformLog/platformLog.service';
import { handleError } from '@src/helpers/handlerError';
import { encryptPassword, verifyPassword } from '@src/helpers/encryption';

import CustomResponse from '@src/models/customResponse.model';
import httpCodes from '@src/constants/httpCodes';
import responseCodes from '@src/constants/responseCodes';
import prisma from '@src/config/database';

export const createUserLoginService = async (
  args: IUserLoginCreateArgs
): Promise<CustomResponse<IUserLogin | undefined>> => {
  const {
    userId,
    password,
    onBoarding,
    verifiedEmail,
    privacyPolicy,
    defaultLanguage,
    platformCode,
  } = args;

  try {
    const platformCodeExists = await validatePlatformCodeService(platformCode);
    if (!platformCodeExists) {
      return new CustomResponse(
        httpCodes.FORBIDDEN,
        undefined,
        responseCodes.INVALID_PLATFORM_CODE
      );
    }

    const userLogin = await prisma.userLogin.findFirst({
      where: {
        userId,
      },
    });

    if (userLogin) {
      return new CustomResponse(
        httpCodes.CONFLICT,
        undefined,
        responseCodes.DUPLICATE_ENTRY
      );
    }

    const encryptedPassword = await encryptPassword(password);

    const response = await prisma.userLogin.create({
      data: {
        userId,
        password: encryptedPassword,
        onBoarding: onBoarding ?? false,
        verifiedEmail: verifiedEmail ?? false,
        privacyPolicy: privacyPolicy ?? false,
        defaultLanguage: defaultLanguage ?? 'en',
        platformCode,
      },
    });

    return new CustomResponse(httpCodes.CREATED, response, undefined);
  } catch (error) {
    await createPlatformLogService({ description: error as string });
    return handleError(error) as CustomResponse<IUserLogin | undefined>;
  }
};

export const getUserLoginByUserIdService = async (
  userId: string
): Promise<CustomResponse<IUserLogin | undefined>> => {
  try {
    const response = await prisma.userLogin.findFirst({
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
    return handleError(error) as CustomResponse<IUserLogin | undefined>;
  }
};

export const updateUserLoginService = async (
  args: IUserLoginUpdateArgs
): Promise<CustomResponse<IUserLogin | undefined>> => {
  const { userId, onBoarding, verifiedEmail, privacyPolicy, defaultLanguage } =
    args;

  try {
    const userLogin = await prisma.userLogin.findFirst({
      where: {
        userId,
      },
    });

    if (!userLogin) {
      return new CustomResponse(
        httpCodes.NOT_FOUND,
        undefined,
        responseCodes.NOT_FOUND
      );
    }

    const response = await prisma.userLogin.update({
      where: {
        userId,
      },
      data: {
        onBoarding: onBoarding ?? userLogin.onBoarding,
        verifiedEmail: verifiedEmail ?? userLogin.verifiedEmail,
        privacyPolicy: privacyPolicy ?? userLogin.privacyPolicy,
        defaultLanguage: defaultLanguage ?? userLogin.defaultLanguage,
      },
    });

    return new CustomResponse(httpCodes.OK, response, undefined);
  } catch (error) {
    await createPlatformLogService({ description: error as string });
    return handleError(error) as CustomResponse<IUserLogin | undefined>;
  }
};

export const updateUserLoginPasswordService = async (
  args: IUserLoginUpdatePassword
): Promise<CustomResponse<IUserLogin | undefined>> => {
  const { userId, oldPassword, newPassword } = args;

  try {
    const userLogin = await prisma.userLogin.findFirst({
      where: {
        userId,
      },
    });

    if (!userLogin) {
      return new CustomResponse(
        httpCodes.NOT_FOUND,
        undefined,
        responseCodes.NOT_FOUND
      );
    }

    const isValidPassword = await verifyPassword(
      oldPassword,
      userLogin.password
    );
    if (!isValidPassword) {
      return new CustomResponse(
        httpCodes.UNAUTHORIZED,
        undefined,
        responseCodes.INVALID_PASSWORD
      );
    }

    const encryptedPassword = await encryptPassword(newPassword);

    const response = await prisma.userLogin.update({
      where: {
        userId,
      },
      data: {
        password: encryptedPassword,
      },
    });

    return new CustomResponse(httpCodes.OK, response, undefined);
  } catch (error) {
    await createPlatformLogService({ description: error as string });
    return handleError(error) as CustomResponse<IUserLogin | undefined>;
  }
};
