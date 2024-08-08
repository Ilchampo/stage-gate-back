export interface IWorkspaceSetting {
  id: string;
  workspaceId: string;
  maxManagers: number;
  maxCollaborators: number;
  featureReviewers: number;
}

export interface IWorkspaceSettingCreateArgs {
  workspaceId: string;
  maxManagers?: number;
  maxCollaborators?: number;
  featureReviewers?: number;
}

export interface IWorkspaceSettingUpdateArgs {
  workspaceId: string;
  maxManagers?: number;
  maxCollaborators?: number;
  featureReviewers?: number;
}
