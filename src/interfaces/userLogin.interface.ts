import type { UserRole } from '@prisma/client';

export interface IUserLogin {
  id?: string;
  userId: string;
  password: string;
  onBoarding: boolean;
  verifiedEmail: boolean;
  privacyPolicy: boolean;
  role: UserRole;
}

export interface IUserLoginCreateArgs {
  userId: string;
  password: string;
  onBoarding: boolean;
  verifiedEmail: boolean;
  privacyPolicy: boolean;
  role: UserRole;
}
export interface IUserLoginUpdateArgs {
  userId: string;
  onBoarding: boolean;
  verifiedEmail: boolean;
  privacyPolicy: boolean;
}

export interface IUserLoginUpdatePasswordArgs {
  userId: string;
  password: string;
}

export interface IUserLoginUpdateRoleArgs {
  userId: string;
  role: UserRole;
}
