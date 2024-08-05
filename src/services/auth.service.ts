import type {
  IAuthSignInArgs,
  IAuthSignUpArgs,
} from '@src/interfaces/auth.interface';

import { createUserService, deleteUserByIdService } from './user.service';
import { createUserLoginService } from './userLogin.service';
import { handleError } from '@src/utils/handleError';
import { verifyPassword } from '@src/utils/encryptionUtils';
import { decodeToken, generateToken, verifyToken } from '@src/utils/jwtUtils';
import { JwtPayload } from 'jsonwebtoken';

import httpCodes from '@src/constants/httpCodes';
import CustomResponse from '@src/models/customResponse.model';
import prisma from '@src/config/database';

export const signUpService = async (
  args: IAuthSignUpArgs
): Promise<CustomResponse<string | null>> => {
  const { firstName, lastName, email, password, avatar, role } = args;

  try {
    const user = await createUserService({
      firstName,
      lastName,
      email,
      avatar,
    });

    if (user.getCode() !== httpCodes.OK || user.getError()) {
      return new CustomResponse(user.getCode(), null, user.getError());
    }

    const userId = user.getData()?.id;
    const userData = user.getData();

    if (!userId || !userData) {
      return new CustomResponse(httpCodes.NOT_FOUND, null, undefined);
    }

    const userLogin = await createUserLoginService({
      userId,
      password,
      onBoarding: false,
      verifiedEmail: false,
      privacyPolicy: true,
      role,
    });

    const userLoginData = userLogin.getData();

    if (
      userLogin.getCode() !== httpCodes.OK ||
      userLogin.getData() === null ||
      userLogin.getError() ||
      !userLoginData
    ) {
      await deleteUserByIdService(userId);
      return new CustomResponse(
        userLogin.getCode(),
        null,
        userLogin.getError()
      );
    }

    const userToken = generateToken({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      role: userLoginData.role,
      exp: new Date(Date.now() + 3600 * 1000),
    });

    return new CustomResponse(httpCodes.OK, userToken, undefined);
  } catch (error) {
    return handleError(error) as CustomResponse<string | null>;
  }
};

export const signInService = async (
  args: IAuthSignInArgs
): Promise<CustomResponse<string | null>> => {
  const { email, password } = args;

  try {
    const user = await prisma.tblUser.findUnique({
      where: {
        email,
      },
      include: {
        UserLogin: true,
      },
    });

    if (!user || !user.UserLogin) {
      return new CustomResponse(httpCodes.NOT_FOUND, null, 'User not found');
    }

    const isPasswordValid = await verifyPassword(
      password,
      user.UserLogin[0].password
    );

    if (!isPasswordValid) {
      return new CustomResponse(
        httpCodes.UNAUTHORIZED,
        null,
        'Invalid password'
      );
    }

    const userToken = generateToken({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.UserLogin[0].role,
      exp: new Date(Date.now() + 3600 * 1000),
    });

    return new CustomResponse(httpCodes.OK, userToken, undefined);
  } catch (error) {
    return handleError(error) as CustomResponse<string | null>;
  }
};

export const refreshTokenService = async (
  token: string
): Promise<CustomResponse<string | null>> => {
  try {
    const validToken = verifyToken({ token });

    if (!validToken) {
      return new CustomResponse(
        httpCodes.UNAUTHORIZED,
        null,
        'Invalid or expired token'
      );
    }

    const decoded = decodeToken({ token }) as JwtPayload;

    const user = await prisma.tblUser.findUnique({
      where: { email: decoded.email },
      include: {
        UserLogin: true,
      },
    });
    if (!user) {
      return new CustomResponse(httpCodes.NOT_FOUND, null, 'User not found');
    }

    const newToken = generateToken({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.UserLogin[0].role,
      exp: new Date(Date.now() + 3600 * 1000),
    });

    return new CustomResponse(httpCodes.OK, newToken, null);
  } catch (error) {
    return handleError(error) as CustomResponse<string | null>;
  }
};
