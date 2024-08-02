import type {
  IUserLogin,
  IUserLoginCreateArgs,
  IUserLoginUpdateArgs,
  IUserLoginUpdateRoleArgs,
  IUserLoginUpdatePasswordArgs,
} from '@src/interfaces/userLogin.interface';

import { encryptPassword } from '@src/utils/encryptionUtils';
import { handleError } from '@src/utils/handleError';

import httpCodes from '@src/constants/httpCodes';
import CustomResponse from '@src/models/customResponse.model';
import prisma from '@src/config/database';

export const createUserLoginService = async (
  args: IUserLoginCreateArgs
): Promise<CustomResponse<IUserLogin>> => {
  const { userId, password, onBoarding, verifiedEmail, privacyPolicy, role } =
    args;

  try {
    const encryptedPassword = await encryptPassword(password);
    const response = await prisma.tblUserLogin.create({
      data: {
        userId,
        password: encryptedPassword,
        onBoarding,
        verifiedEmail,
        privacyPolicy,
        role,
      },
    });

    return new CustomResponse(httpCodes.OK, response, undefined);
  } catch (error) {
    return handleError(error) as CustomResponse<IUserLogin>;
  }
};

export const getUserLoginByUserIdService = async (
  userId: string
): Promise<CustomResponse<IUserLogin | null>> => {
  try {
    const response = await prisma.tblUserLogin.findFirst({
      where: {
        userId,
      },
    });

    if (!response) {
      return new CustomResponse(httpCodes.NOT_FOUND, null, undefined);
    }

    return new CustomResponse(httpCodes.OK, response, undefined);
  } catch (error) {
    return handleError(error) as CustomResponse<IUserLogin>;
  }
};

export const updateUserLoginByUserIdService = async (
  args: IUserLoginUpdateArgs
): Promise<CustomResponse<IUserLogin>> => {
  const { userId, onBoarding, verifiedEmail, privacyPolicy } = args;

  try {
    const response = await prisma.tblUserLogin.update({
      where: {
        userId,
      },
      data: {
        onBoarding,
        verifiedEmail,
        privacyPolicy,
      },
    });

    return new CustomResponse(httpCodes.OK, response, undefined);
  } catch (error) {
    return handleError(error) as CustomResponse<IUserLogin>;
  }
};

export const updateUserLoginPasswordByUserIdService = async (
  args: IUserLoginUpdatePasswordArgs
): Promise<CustomResponse<IUserLogin>> => {
  const { userId, password } = args;

  try {
    const encryptedPassword = await encryptPassword(password);
    const response = await prisma.tblUserLogin.update({
      where: {
        userId,
      },
      data: {
        password: encryptedPassword,
      },
    });

    return new CustomResponse(httpCodes.OK, response, undefined);
  } catch (error) {
    return handleError(error) as CustomResponse<IUserLogin>;
  }
};

export const updateUserLoginRoleByUserIdService = async (
  args: IUserLoginUpdateRoleArgs
): Promise<CustomResponse<IUserLogin>> => {
  const { userId, role } = args;

  try {
    const response = await prisma.tblUserLogin.update({
      where: {
        userId,
      },
      data: {
        role,
      },
    });

    return new CustomResponse(httpCodes.OK, response, undefined);
  } catch (error) {
    return handleError(error) as CustomResponse<IUserLogin>;
  }
};
