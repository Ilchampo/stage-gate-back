import type { UserRole } from '@prisma/client';

export interface IAuthSignInArgs {
  email: string;
  password: string;
}

export interface IAuthSignUpArgs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: Buffer | null;
  role: UserRole;
}

export interface IAuthGenerateTokenArgs {
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  exp: Date;
}

export interface IAuthVerifyTokenArgs {
  token: string;
}
