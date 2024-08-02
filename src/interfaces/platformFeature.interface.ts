export interface IPlatformFeature {
  id?: string;
  feature: string;
  enabled: boolean;
  createdOn: Date;
}

export interface IPlatformFeatureCreateArgs {
  feature: string;
  enabled?: boolean;
}

export interface IPlatformFeatureUpdateArgs {
  id: string;
  feature?: string;
  enabled?: boolean;
}
