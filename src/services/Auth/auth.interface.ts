import { IUserCreateArgs } from '../User/user.interface';
import { IUserLoginCreateArgs } from '../UserLogin/userLogin.interface';

export interface IAuthSignInArgs {
  email: string;
  password: string;
}

export interface IAuthSignUpArgs
  extends IUserCreateArgs,
    Omit<IUserLoginCreateArgs, 'userId'> {}

export interface IAuthToken {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
}
