export interface IWorkspace {
  id?: string;
  name: string;
  description: string;
  repository: string;
  logo: Buffer | null;
  code: string;
}

export interface IWorkspaceCreateArgs {
  name: string;
  description: string;
  repository: string;
  logo?: Buffer;
}

export interface IWorkspaceUpdateArgs {
  id: string;
  name?: string;
  description?: string;
  repository?: string;
  logo?: Buffer;
}
