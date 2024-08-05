import type { IAuthGenerateTokenArgs } from '@src/interfaces/auth.interface';

export const jwtTokenMock = 'test-token';

export const jwtDecodedPayload = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@email.com',
  role: 'admin',
  exp: Math.floor(new Date().getTime() / 1000),
};

export const jwtGenerateTokenArgsMock: IAuthGenerateTokenArgs = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@email.com',
  role: 'admin',
  exp: new Date(),
};
