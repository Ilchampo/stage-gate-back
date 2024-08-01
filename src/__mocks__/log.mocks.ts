import type {
  ILog,
  ILogCreateArgs,
  ILogUpdateArgs,
} from '@src/interfaces/log.interface';

export const logResponseMock: ILog = {
  id: 'id-1',
  description: 'Test log',
  createdOn: new Date(),
};

export const logCreateMock: ILogCreateArgs = {
  description: 'Test log',
};

export const logUpdateMock: ILogUpdateArgs = {
  id: 'id-1',
  description: 'Updated test log',
};

export const logArrayResponseMock: ILog[] = [logResponseMock];

export const logErrorMock = new Error('Log error');
