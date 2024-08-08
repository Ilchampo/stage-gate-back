export interface IFeatureStat {
  id: string;
  featureId: string;
  startDate: Date;
  completionDate?: Date;
  rejections: number;
  updates: number;
}

export interface IFeatureStatCreateArgs {
  featureId: string;
  startDate: Date;
  completionDate?: Date;
  rejections?: number;
  updates?: number;
}

export interface IFeatureStatUpdateArgs {
  id: string;
  featureId?: string;
  startDate?: Date;
  completionDate?: Date;
  rejections?: number;
  updates?: number;
}
