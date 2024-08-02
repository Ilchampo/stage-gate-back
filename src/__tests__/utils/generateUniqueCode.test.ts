import { generateUniqueCode } from '@src/utils/generateUniqueCode';

describe('generateUniqueCode', () => {
  it('should generate a string', () => {
    const code = generateUniqueCode();
    expect(typeof code).toBe('string');
  });

  it('should generate a string of length 9', () => {
    const code = generateUniqueCode();
    expect(code).toHaveLength(9);
  });

  it('should generate an uppercase string', () => {
    const code = generateUniqueCode();
    expect(code).toEqual(code.toUpperCase());
  });

  it('should generate unique codes', () => {
    const codes = new Set();
    for (let i = 0; i < 1000; i++) {
      codes.add(generateUniqueCode());
    }
    expect(codes.size).toBe(1000);
  });
});
