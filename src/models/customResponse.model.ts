import httpCodes from '@src/constants/httpCodes';

class CustomResponse<T> {
  private code: number;
  private data: T | null;
  private error: string | null;

  public constructor(
    code: number = httpCodes.INTERNAL_SERVER_ERROR,
    data: T | null = null,
    error: string | null = null
  ) {
    this.code = code;
    this.data = data;
    this.error = error;
  }

  public setData(
    code: number = httpCodes.INTERNAL_SERVER_ERROR,
    data: T | null = null,
    error: string | null = null
  ): void {
    this.code = code;
    this.data = data;
    this.error = error;
  }

  public getCode(): number {
    return this.code;
  }

  public getData(): T | null {
    return this.data;
  }

  public getError(): string | null {
    return this.error;
  }
}

export default CustomResponse;
