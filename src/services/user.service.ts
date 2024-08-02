import type {
  IUser,
  IUserCreateArgs,
  IUserUpdateArgs,
} from '@src/interfaces/user.interface';

import { handleError } from '@src/utils/handleError';
import httpCodes from '@src/constants/httpCodes';
import CustomResponse from '@src/models/customResponse.model';
import prisma from '@src/config/database';

export const createUserService = async (
  args: IUserCreateArgs
): Promise<CustomResponse<IUser>> => {
  const { firstName, lastName, email, avatar } = args;
  try {
    const response = await prisma.tblUser.create({
      data: {
        firstName,
        lastName,
        email,
        avatar,
      },
    });

    return new CustomResponse(httpCodes.OK, response, undefined);
  } catch (error) {
    return handleError(error) as CustomResponse<IUser>;
  }
};

export const getUserByIdService = async (
  id: string
): Promise<CustomResponse<IUser | null>> => {
  try {
    const response = await prisma.tblUser.findUnique({
      where: { id },
    });

    if (!response) {
      return new CustomResponse(httpCodes.NOT_FOUND, null, undefined);
    }

    return new CustomResponse(httpCodes.OK, response, undefined);
  } catch (error) {
    return handleError(error) as CustomResponse<IUser>;
  }
};

export const getAllUsersService = async (): Promise<
  CustomResponse<IUser[]>
> => {
  try {
    const response = await prisma.tblUser.findMany({
      orderBy: { firstName: 'asc' },
    });

    return new CustomResponse(httpCodes.OK, response, undefined);
  } catch (error) {
    return handleError(error) as CustomResponse<IUser[]>;
  }
};

export const updateUserByIdService = async (
  args: IUserUpdateArgs
): Promise<CustomResponse<IUser>> => {
  const { id, firstName, lastName, email, avatar } = args;
  try {
    const response = await prisma.tblUser.update({
      where: { id: id },
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        avatar: avatar,
      },
    });

    return new CustomResponse(httpCodes.OK, response, undefined);
  } catch (error) {
    return handleError(error) as CustomResponse<IUser>;
  }
};

export const deleteUserByIdService = async (
  id: string
): Promise<CustomResponse<IUser>> => {
  try {
    const response = await prisma.tblUser.delete({
      where: { id },
    });

    return new CustomResponse(httpCodes.OK, response, undefined);
  } catch (error) {
    return handleError(error) as CustomResponse<IUser>;
  }
};
