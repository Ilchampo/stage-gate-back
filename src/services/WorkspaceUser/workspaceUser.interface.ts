import { EnumRole } from '../../enums/role.enum';

export interface IWorkspaceUser {
  id: string;
  workspaceId: string;
  userId: string;
  role: EnumRole;
}

export interface IWorkspaceUserCreateArgs {
  workspaceId: string;
  userId: string;
  role: EnumRole;
}

export interface IWorkspaceUserUpdateArgs {
  id: string;
  workspaceId?: string;
  userId?: string;
  role?: EnumRole;
}
