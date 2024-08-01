export interface ILog {
  id?: string;
  description: string;
  createdOn: Date;
}

export interface ILogCreateArgs {
  description: string;
}

export interface ILogUpdateArgs {
  id: string;
  description: string;
}
