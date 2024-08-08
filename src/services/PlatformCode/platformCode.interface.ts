export interface IPlatformCode {
  id: string;
  code: string;
  createdOn: Date;
  validUntilDate?: Date;
}

export interface IPlatformCodeCreateArgs {
  code: string;
  validUntilDate?: Date;
}

export interface IPlatformCodeUpdateArgs {
  id: string;
  code?: string;
  validUntilDate?: Date;
}
