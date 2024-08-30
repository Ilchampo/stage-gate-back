export interface IAuthSignInArgs {
  email: string;
  password: string;
}

export interface IAuthSignUpArgs {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  code: string;
}

export interface IAuthToken {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
}
