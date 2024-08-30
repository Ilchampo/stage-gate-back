import type { Request, Response } from 'express';

import * as authService from '../services/Auth/auth.service';
import httpCodes from '../constants/httpCodes';

export const validateCodeController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { code } = req.body;
    const response = await authService.validateCodeService(code);
    return res.status(response.code).json(response);
  } catch (error) {
    return res.status(httpCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export const signInController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, password } = req.body;
    const response = await authService.signInService({ email, password });
    return res.status(response.code).json(response);
  } catch (error) {
    return res.status(httpCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export const signUpController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { firstname, lastname, email, password, code } = req.body;

    const response = await authService.signUpService({
      firstname,
      lastname,
      email,
      password,
      code,
    });

    return res.status(response.code).json(response);
  } catch (error) {
    return res.status(httpCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};
