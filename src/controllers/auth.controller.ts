import type { Request, Response } from 'express';

import * as authService from '../services/Auth/auth.service';
import httpCodes from '../constants/httpCodes';

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
    const { firstname, lastname, email, avatar, password, platformCode } =
      req.body;
    const response = await authService.signUpService({
      firstname,
      lastname,
      email,
      avatar,
      password,
      platformCode,
    });
    return res.status(response.code).json(response);
  } catch (error) {
    return res.status(httpCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};
