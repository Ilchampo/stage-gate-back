import type { EnumCheck, EnumStatus } from '@prisma/client';

export interface IFeatureReview {
  id: string;
  featureId: string;
  reviewerId: string;
  functionl: boolean;
  cleanCode: EnumCheck;
  featureTest: EnumCheck;
  securityChecks: EnumCheck;
  status: EnumStatus;
  comment?: string;
  reviewedOn?: Date;
}

export interface IFeatureReviewCreateArgs {
  featureId: string;
  reviewerId: string;
  functionl?: boolean;
  cleanCode?: EnumCheck;
  featureTest?: EnumCheck;
  securityChecks?: EnumCheck;
  status?: EnumStatus;
  comment?: string;
  reviewedOn?: Date;
}

export interface IFeatureReviewUpdateArgs {
  id: string;
  featureId?: string;
  reviewerId?: string;
  functionl?: boolean;
  cleanCode?: EnumCheck;
  featureTest?: EnumCheck;
  securityChecks?: EnumCheck;
  status?: EnumStatus;
  comment?: string;
  reviewedOn?: Date;
}
