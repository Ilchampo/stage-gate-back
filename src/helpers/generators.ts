export const generateUniqueCode = (): string =>
  Math.random().toString(36).substring(2, 11).toUpperCase();
