export interface INotification {
  id: string;
  userId: string;
  workspaceId?: string;
  releaseId?: string;
  featureId?: string;
  notificationType: string;
  readByUser: boolean;
  createdOn: Date;
}

export interface INotificationCreateArgs {
  userId: string;
  workspaceId?: string;
  releaseId?: string;
  featureId?: string;
  notificationType: string;
  readByUser?: boolean;
  createdOn: Date;
}

export interface INotificationUpdateArgs {
  id: string;
  userId?: string;
  workspaceId?: string;
  releaseId?: string;
  featureId?: string;
  notificationType?: string;
  readByUser?: boolean;
  createdOn?: Date;
}
