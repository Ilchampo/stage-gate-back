import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  moduleFileExtensions: [
    'js',
    'mjs',
    'cjs',
    'jsx',
    'ts',
    'tsx',
    'json',
    'node',
  ],
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1',
    '@prisma/client': '<rootDir>/src/__mocks__/@prisma/client.ts',
  },
  preset: 'ts-jest',
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  transformIgnorePatterns: ['/node_modules/', '\\.pnp\\.[^\\/]+$'],
  watchman: true,
};

export default config;
