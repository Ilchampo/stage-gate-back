import type {
  IWorkspace,
  IWorkspaceCreateArgs,
  IWorkspaceUpdateArgs,
} from '@src/interfaces/workspace.interface';

export const logoBuffer = Buffer.from('https://example.com/logo.png');

export const workspaceResponseMock: IWorkspace = {
  id: 'ws-1',
  name: 'Test Workspace',
  description: 'A test workspace',
  repository: 'https://github.com/test-repo',
  logo: logoBuffer,
  code: 'ABC123XYZ',
};

export const workspaceCreateMock: IWorkspaceCreateArgs = {
  name: 'Test Workspace',
  description: 'A test workspace',
  repository: 'https://github.com/test-repo',
  logo: logoBuffer,
};

export const workspaceUpdateMock: IWorkspaceUpdateArgs = {
  id: 'ws-1',
  name: 'Updated Workspace',
  description: 'An updated test workspace',
  repository: 'https://github.com/updated-repo',
  logo: logoBuffer,
};

export const workspaceArrayResponseMock: IWorkspace[] = [workspaceResponseMock];

export const workspaceErrorMock = new Error('Workspace error');
