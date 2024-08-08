import { EnumStatus } from '../enums/status.enum';

export interface IRelease {
  id: string;
  workspaceId: string;
  version: string;
  startDate: Date;
  endDate?: Date;
  status: EnumStatus;
}

export interface IReleaseCreateArgs {
  workspaceId: string;
  version: string;
  startDate: Date;
  endDate?: Date;
  status: EnumStatus;
}

export interface IReleaseUpdateArgs {
  id: string;
  workspaceId?: string;
  version?: string;
  startDate?: Date;
  endDate?: Date;
  status?: EnumStatus;
}
