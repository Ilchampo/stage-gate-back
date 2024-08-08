import httpCodes from '../constants/httpCodes';

class CustomResponse<T> {
  public code: number;
  public data: T | undefined;
  public error: string | undefined;

  public constructor(
    code: number = httpCodes.INTERNAL_SERVER_ERROR,
    data: T | undefined = undefined,
    error: string | undefined = undefined
  ) {
    this.code = code;
    this.data = data;
    this.error = error;
  }

  public setData(
    code: number = httpCodes.INTERNAL_SERVER_ERROR,
    data: T | undefined = undefined,
    error: string | undefined = undefined
  ): void {
    this.code = code;
    this.data = data;
    this.error = error;
  }
}

export default CustomResponse;
