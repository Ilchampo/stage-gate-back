export interface IUser {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  avatar?: Buffer | null;
}

export interface IUserCreateArgs {
  firstname: string;
  lastname: string;
  email: string;
  avatar?: Buffer | null;
}

export interface IUserUpdateArgs {
  id: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  avatar?: Buffer | null;
}
