import { Router } from 'express';

import { authValidationSchema } from '../helpers/validators';

import * as authController from '../controllers/auth.controller';
import validationMiddleware from '../middlewares/validation.middleware';

const router = Router();

// @method  POST /auth/signup
// @desc    Sign un user
// @access  Public
router.post(
  '/signup',
  validationMiddleware(authValidationSchema.signUp),
  authController.signUpController
);

// @method  POST /auth/signin
// @desc    Sign in user
// @access  Public
router.post(
  '/signin',
  validationMiddleware(authValidationSchema.signIn),
  authController.signInController
);

export default router;
