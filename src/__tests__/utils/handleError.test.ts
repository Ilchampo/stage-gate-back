import { handleError } from '@src/utils/handleError';

import responseCodes from '@src/constants/responseCodes';
import httpCodes from '@src/constants/httpCodes';

describe('Test handleError util', () => {
  it('should handle an Error object', () => {
    const error = new Error('Test error');
    const response = handleError(error);

    expect(response.getCode()).toBe(httpCodes.INTERNAL_SERVER_ERROR);
    expect(response.getData()).toBeNull();
    expect(response.getError()).toBe('Test error');
  });

  it('should handle a non-Error object', () => {
    const error = { message: 'Not an error object' };
    const response = handleError(error);

    expect(response.getCode()).toBe(httpCodes.INTERNAL_SERVER_ERROR);
    expect(response.getData()).toBe(null);
    expect(response.getError()).toBe(responseCodes.UNEXPECTED_ERROR);
  });

  it('should handle a string error', () => {
    const error = 'String error';
    const response = handleError(error);

    expect(response.getCode()).toBe(httpCodes.INTERNAL_SERVER_ERROR);
    expect(response.getData()).toBe(null);
    expect(response.getError()).toBe(responseCodes.UNEXPECTED_ERROR);
  });

  it('should handle a null error', () => {
    const response = handleError(null);

    expect(response.getCode()).toBe(httpCodes.INTERNAL_SERVER_ERROR);
    expect(response.getData()).toBe(null);
    expect(response.getError()).toBe(responseCodes.UNEXPECTED_ERROR);
  });
});
