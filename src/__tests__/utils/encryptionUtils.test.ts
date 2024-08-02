import bcrypt from 'bcrypt';
import { encryptPassword, verifyPassword } from '@src/utils/encryptionUtils';

jest.mock('bcrypt');

describe('Auth Service', () => {
  const password = 'password123';
  const hash = 'hashedpassword123';

  describe('encryptPassword', () => {
    it('should encrypt the password and return the hash', async () => {
      (bcrypt.genSalt as jest.Mock).mockResolvedValue('salt');
      (bcrypt.hash as jest.Mock).mockResolvedValue(hash);

      const result = await encryptPassword(password);

      expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
      expect(bcrypt.hash).toHaveBeenCalledWith(password, 'salt');
      expect(result).toBe(hash);
    });

    it('should throw an error if encryption fails', async () => {
      (bcrypt.genSalt as jest.Mock).mockRejectedValue(
        new Error('genSalt error')
      );

      await expect(encryptPassword(password)).rejects.toThrow(
        'Error encrypting password'
      );
    });

    it('should throw a syntax error if encryption fails with a syntax error', async () => {
      (bcrypt.genSalt as jest.Mock).mockRejectedValue(
        new SyntaxError('Syntax error')
      );

      await expect(encryptPassword(password)).rejects.toThrow('Syntax error');
    });
  });

  describe('verifyPassword', () => {
    it('should verify the password and return true', async () => {
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await verifyPassword(password, hash);

      expect(bcrypt.compare).toHaveBeenCalledWith(password, hash);
      expect(result).toBe(true);
    });

    it('should verify the password and return false', async () => {
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const result = await verifyPassword(password, hash);

      expect(bcrypt.compare).toHaveBeenCalledWith(password, hash);
      expect(result).toBe(false);
    });

    it('should throw an error if verification fails', async () => {
      (bcrypt.compare as jest.Mock).mockRejectedValue(
        new Error('compare error')
      );

      await expect(verifyPassword(password, hash)).rejects.toThrow(
        'Error verifying password'
      );
    });

    it('should throw a syntax error if verification fails with a syntax error', async () => {
      (bcrypt.compare as jest.Mock).mockRejectedValue(
        new SyntaxError('Syntax error')
      );

      await expect(verifyPassword(password, hash)).rejects.toThrow(
        'Syntax error'
      );
    });
  });
});
