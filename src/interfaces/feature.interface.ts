import type { EnumStatus } from '@prisma/client';

export interface IFeature {
  id: string;
  releaseId: string;
  developerId: string;
  pullRequestLink: string;
  ticketLink: string;
  status: EnumStatus;
  createdOn: Date;
  updatedOn?: Date;
}

export interface IFeatureCreateArgs {
  releaseId: string;
  developerId: string;
  pullRequestLink: string;
  ticketLink: string;
  status: EnumStatus;
  createdOn: Date;
  updatedOn?: Date;
}

export interface IFeatureUpdateArgs {
  id: string;
  releaseId?: string;
  developerId?: string;
  pullRequestLink?: string;
  ticketLink?: string;
  status?: EnumStatus;
  createdOn?: Date;
  updatedOn?: Date;
}
