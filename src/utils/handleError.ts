import httpCodes from '../constants/httpCodes';
import responseCodes from '@src/constants/responseCodes';
import CustomResponse from '../models/customResponse.model';

export const handleError = (error: unknown): CustomResponse<unknown> => {
  const response = new CustomResponse();
  const errorMessage =
    error instanceof Error ? error.message : responseCodes.UNEXPECTED_ERROR;
  response.setData(httpCodes.INTERNAL_SERVER_ERROR, undefined, errorMessage);

  return response;
};
