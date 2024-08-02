import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10 as const;

export const encryptPassword = async (password: string): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error(error.message);
    }
    throw new Error('Error encrypting password');
  }
};

export const verifyPassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error(error.message);
    }
    throw new Error('Error verifying password');
  }
};
