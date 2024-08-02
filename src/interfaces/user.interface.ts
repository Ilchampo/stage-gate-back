export interface IUser {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: Buffer | null;
}

export interface IUserCreateArgs {
  firstName: string;
  lastName: string;
  email: string;
  avatar: Buffer | null;
}

export interface IUserUpdateArgs {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  avatar?: Buffer;
}
