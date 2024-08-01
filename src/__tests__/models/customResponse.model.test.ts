import httpCodes from '@src/constants/httpCodes';
import CustomResponse from '@src/models/customResponse.model';

describe('Test CustomResponse model', () => {
  it('should create a CustomResponse with default values', () => {
    const response = new CustomResponse();

    expect(response.getCode()).toBe(httpCodes.INTERNAL_SERVER_ERROR);
    expect(response.getData()).toBeNull();
    expect(response.getError()).toBeNull();
  });

  it('should create a CustomResponse with provided values', () => {
    const data = { message: 'Success' };
    const response = new CustomResponse(httpCodes.OK, data, null);

    expect(response.getCode()).toBe(httpCodes.OK);
    expect(response.getData()).toEqual(data);
    expect(response.getError()).toBeNull();
  });

  it('should create a CustomResponse with an error', () => {
    const error = 'Something went wrong';
    const response = new CustomResponse(
      httpCodes.INTERNAL_SERVER_ERROR,
      null,
      error
    );

    expect(response.getCode()).toBe(httpCodes.INTERNAL_SERVER_ERROR);
    expect(response.getData()).toBeNull();
    expect(response.getError()).toBe(error);
  });

  it('should set data and code correctly', () => {
    const data = { message: 'Updated' };
    const response = new CustomResponse();

    response.setData(httpCodes.OK, data, null);

    expect(response.getCode()).toBe(httpCodes.OK);
    expect(response.getData()).toEqual(data);
    expect(response.getError()).toBeNull();
  });

  it('should set error correctly', () => {
    const error = 'New error occurred';
    const response = new CustomResponse();

    response.setData(httpCodes.INTERNAL_SERVER_ERROR, null, error);

    expect(response.getCode()).toBe(httpCodes.INTERNAL_SERVER_ERROR);
    expect(response.getData()).toBeNull();
    expect(response.getError()).toBe(error);
  });
});
