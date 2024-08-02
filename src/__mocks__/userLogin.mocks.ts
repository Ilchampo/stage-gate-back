import type {
  IUserLogin,
  IUserLoginCreateArgs,
  IUserLoginUpdateArgs,
  IUserLoginUpdateRoleArgs,
  IUserLoginUpdatePasswordArgs,
} from '@src/interfaces/userLogin.interface';

export const userLoginResponseMock: IUserLogin = {
  id: 'login-1',
  userId: 'user-1',
  password: 'encryptedpassword123',
  onBoarding: true,
  verifiedEmail: true,
  privacyPolicy: true,
  role: 'admin',
};

export const userLoginCreateMock: IUserLoginCreateArgs = {
  userId: 'user-1',
  password: 'password123',
  onBoarding: true,
  verifiedEmail: true,
  privacyPolicy: true,
  role: 'admin',
};

export const userLoginUpdateMock: IUserLoginUpdateArgs = {
  userId: 'user-1',
  onBoarding: false,
  verifiedEmail: true,
  privacyPolicy: false,
};

export const userLoginUpdatePasswordMock: IUserLoginUpdatePasswordArgs = {
  userId: 'user-1',
  password: 'newpassword123',
};

export const userLoginUpdateRoleMock: IUserLoginUpdateRoleArgs = {
  userId: 'user-1',
  role: 'manager',
};

export const userLoginArrayResponseMock: IUserLogin[] = [userLoginResponseMock];

export const userLoginErrorMock = new Error('UserLogin error');
