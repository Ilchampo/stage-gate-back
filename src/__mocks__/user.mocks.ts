import type {
  IUser,
  IUserCreateArgs,
  IUserUpdateArgs,
} from '@src/interfaces/user.interface';

const avatarBuffer = Buffer.from('avatar.png');

export const userResponseMock: IUser = {
  id: 'user-1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@email.com',
  avatar: avatarBuffer,
};

export const userCreateMock: IUserCreateArgs = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@email.com',
  avatar: avatarBuffer,
};

export const userUpdateMock: IUserUpdateArgs = {
  id: 'user-1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@email.com',
  avatar: avatarBuffer,
};

export const userArrayResponseMock: IUser[] = [userResponseMock];

export const userErrorMock = new Error('User error');
