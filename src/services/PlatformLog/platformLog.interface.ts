export interface IPlatformLog {
  id: string;
  description: string;
  createdOn: Date;
}

export interface IPlatformLogCreateArgs {
  description: string;
}
