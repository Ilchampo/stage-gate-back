import type { EnumCheck } from '../enums/check.enum';
import type { EnumStatus } from '../enums/status.enum';

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
