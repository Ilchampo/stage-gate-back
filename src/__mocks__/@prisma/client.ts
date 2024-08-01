const mockPrisma = {
  $connect: jest.fn(),
  $disconnect: jest.fn(),
  $use: jest.fn(),
  $executeRaw: jest.fn(),
  $executeRawUnsafe: jest.fn(),
  $queryRaw: jest.fn(),
  $queryRawUnsafe: jest.fn(),
  $transaction: jest.fn(),
  $extends: jest.fn(),
  $on: jest.fn(),
  tblLog: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    deleteMany: jest.fn(),
  },
};

const PrismaClientMock = jest.fn().mockImplementation(() => {
  return mockPrisma;
});

export { PrismaClientMock as PrismaClient };
export default mockPrisma;