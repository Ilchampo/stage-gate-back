import type {
  IAuthSignInArgs,
  IAuthSignUpArgs,
} from '@src/services/Auth/auth.interface';

import {
  createUserService,
  getUserByEmailService,
} from '@src/services/User/user.service';
import {
  createUserLoginService,
  getUserLoginByUserIdService,
} from '@src/services/UserLogin/userLogin.service';
import { createPlatformLogService } from '@src/services/PlatformLog/platformLog.service';
import { handleError } from '@src/helpers/handlerError';
import { verifyPassword } from '@src/helpers/encryption';
import { generateToken } from '@src/helpers/authorization';

import CustomResponse from '@src/models/customResponse.model';
import httpCodes from '@src/constants/httpCodes';
import responseCodes from '@src/constants/responseCodes';

export const signInService = async (
  args: IAuthSignInArgs
): Promise<CustomResponse<string | undefined>> => {
  const { email, password } = args;

  try {
    const user = await getUserByEmailService(email);

    if (!user.data) {
      return new CustomResponse(
        httpCodes.NOT_FOUND,
        undefined,
        responseCodes.USER_NOT_FOUND
      );
    } else if (user.error || user.code !== httpCodes.OK) {
      return new CustomResponse(user.code, undefined, user.error);
    }

    const userLogin = await getUserLoginByUserIdService(user.data.id);

    if (!userLogin.data) {
      return new CustomResponse(
        httpCodes.NOT_FOUND,
        undefined,
        responseCodes.USER_NOT_FOUND
      );
    } else if (userLogin.error || userLogin.code !== httpCodes.OK) {
      return new CustomResponse(userLogin.code, undefined, userLogin.error);
    }

    const isPasswordMatch = await verifyPassword(
      password,
      userLogin.data.password
    );

    if (!isPasswordMatch) {
      return new CustomResponse(
        httpCodes.UNAUTHORIZED,
        undefined,
        responseCodes.INVALID_PASSWORD
      );
    }

    const token = generateToken({
      id: user.data.id,
      firstname: user.data.firstname,
      lastname: user.data.lastname,
      email: user.data.email,
    });

    return new CustomResponse(httpCodes.OK, token, undefined);
  } catch (error) {
    await createPlatformLogService({ description: error as string });
    return handleError(error) as CustomResponse<string | undefined>;
  }
};

export const signUpService = async (
  args: IAuthSignUpArgs
): Promise<CustomResponse<string | undefined>> => {
  const { firstname, lastname, email, avatar, password, platformCode } = args;

  try {
    const user = await getUserByEmailService(email);

    if (user) {
      return new CustomResponse(
        httpCodes.CONFLICT,
        undefined,
        responseCodes.DUPLICATE_ENTRY
      );
    }

    const newUser = await createUserService({
      firstname,
      lastname,
      email,
      avatar,
    });

    if (newUser.error || newUser.code !== httpCodes.CREATED || !newUser.data) {
      return new CustomResponse(newUser.code, undefined, newUser.error);
    }

    const newUserLogin = await createUserLoginService({
      userId: newUser.data.id,
      password,
      privacyPolicy: true,
      platformCode,
    });

    if (newUserLogin.error || newUserLogin.code !== httpCodes.CREATED) {
      return new CustomResponse(
        newUserLogin.code,
        undefined,
        newUserLogin.error
      );
    }

    const token = generateToken({
      id: newUser.data.id,
      firstname: newUser.data.firstname,
      lastname: newUser.data.lastname,
      email: newUser.data.email,
    });

    return new CustomResponse(httpCodes.CREATED, token, undefined);
  } catch (error) {
    await createPlatformLogService({ description: error as string });
    return handleError(error) as CustomResponse<string | undefined>;
  }
};
