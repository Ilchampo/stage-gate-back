import type {
  IPlatformFeature,
  IPlatformFeatureCreateArgs,
  IPlatformFeatureUpdateArgs,
} from '@src/interfaces/platformFeature.interface';

export const platformFeatureResponseMock: IPlatformFeature = {
  id: 'feat-1',
  feature: 'TEST-FEATURE',
  enabled: true,
  createdOn: new Date(),
};

export const platformFeatureFalseResponseMock: IPlatformFeature = {
  id: 'feat-1',
  feature: 'TEST-FEATURE',
  enabled: false,
  createdOn: new Date(),
};

export const platformFeatureCreateMock: IPlatformFeatureCreateArgs = {
  feature: 'TEST-FEATURE',
  enabled: true,
};
export const platformFeatureCreateFeatureMock: IPlatformFeatureCreateArgs = {
  feature: 'TEST-FEATURE',
};

export const platformFeatureUpdateMock: IPlatformFeatureUpdateArgs = {
  id: 'feat-1',
  feature: 'TEST-FEATURE',
  enabled: true,
};

export const platformFeatureArrayResponseMock: IPlatformFeature[] = [
  platformFeatureResponseMock,
];

export const platformFeatureErrorMock = new Error('Platform Feature error');
