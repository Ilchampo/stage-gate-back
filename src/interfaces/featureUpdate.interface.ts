export interface IFeatureUpdate {
  id: string;
  featureId: string;
  comment: string;
  updatedOn: Date;
}

export interface IFeatureUpdateCreateArgs {
  featureId: string;
  comment: string;
  updatedOn: Date;
}

export interface IFeatureUpdateUpdateArgs {
  id: string;
  featureId?: string;
  comment?: string;
  updatedOn?: Date;
}
