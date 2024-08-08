export interface IPlatformFeature {
  id: string;
  feature: string;
  enabled: boolean;
  updatedOn?: Date | null;
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
