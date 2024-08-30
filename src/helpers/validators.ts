import Joi from 'joi';

export const authValidationSchema = {
  code: Joi.object({
    code: Joi.string().required(),
  }),
  signIn: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
  signUp: Joi.object({
    email: Joi.string().email().required(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    password: Joi.string().required(),
    code: Joi.string().required(),
  }),
};

export const platformCodeValidationSchema = {
  create: Joi.object({
    code: Joi.string().required(),
    validUntilDate: Joi.date().required(),
  }),
  get: Joi.object({
    id: Joi.string().required(),
  }),
  update: Joi.object({
    id: Joi.string().required(),
    code: Joi.string().allow(null),
    validUntilDate: Joi.date().allow(null),
  }),
  delete: Joi.object({
    id: Joi.string().required(),
  }),
  validate: Joi.object({
    code: Joi.string().allow(null),
  }),
};

export const platformFeatureValidationSchema = {
  create: Joi.object({
    feature: Joi.string().required(),
    enabled: Joi.boolean().allow(null).default(false),
  }),
  get: Joi.object({
    id: Joi.string().required(),
  }),
  update: Joi.object({
    id: Joi.string().required(),
    feature: Joi.string().allow(null),
    enabled: Joi.boolean().allow(null).default(false),
  }),
  delete: Joi.object({
    id: Joi.string().required(),
  }),
};

export const platformLogValidationSchema = {
  create: Joi.object({
    description: Joi.string().required(),
  }),
  get: Joi.object({
    id: Joi.string().required(),
  }),
};

export const userValidationSchema = {
  create: Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required(),
    avatar: Joi.binary().allow(null),
  }),
  getByEmail: Joi.object({
    email: Joi.string().email().required(),
  }),
  get: Joi.object({
    id: Joi.string().required(),
  }),
  getByWorkspace: Joi.object({
    workspaceId: Joi.string().required,
  }),
  update: Joi.object({
    id: Joi.string().required(),
    firstname: Joi.string().allow(null),
    lastname: Joi.string().allow(null),
    email: Joi.string().email().allow(null),
    avatar: Joi.binary().allow(null),
  }),
  delete: Joi.object({
    id: Joi.string().required(),
  }),
};

export const userLoginValidationSchema = {
  create: Joi.object({
    userId: Joi.string().required(),
    password: Joi.string().required(),
    onBoarding: Joi.boolean().allow(null).default(false),
    verifiedEmail: Joi.boolean().allow(null).default(false),
    privacyPolicy: Joi.boolean().allow(null).default(false),
    defaultLanguage: Joi.string().required().default('en'),
    platformCode: Joi.string().required(),
  }),
  get: Joi.object({
    userId: Joi.string().required(),
  }),
  update: Joi.object({
    userId: Joi.string().required(),
    onBoarding: Joi.boolean().allow(null).default(false),
    verifiedEmail: Joi.boolean().allow(null).default(false),
    privacyPolicy: Joi.boolean().allow(null).default(false),
    defaultLanguage: Joi.string().allow(null),
  }),
  updatePassword: Joi.object({
    userId: Joi.string().required(),
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required(),
  }),
};

export const workspaceValidationSchema = {
  validate: Joi.object({
    code: Joi.string().required(),
  }),
  create: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    repository: Joi.string().required(),
    logo: Joi.binary().allow(null),
  }),
  get: Joi.object({
    id: Joi.string().required(),
  }),
  getByUser: Joi.object({
    userId: Joi.string().required(),
  }),
  update: Joi.object({
    id: Joi.string().required(),
    name: Joi.string().allow(null),
    description: Joi.string().allow(null),
    repository: Joi.string().allow(null),
    logo: Joi.binary().allow(null),
  }),
  delete: Joi.object({
    id: Joi.string().required(),
  }),
};

export const workspaceSettingValidationSchema = {
  create: Joi.object({
    workspaceId: Joi.string().required(),
    maxManagers: Joi.number().required(),
    maxCollaborators: Joi.number().required(),
    featureReviewers: Joi.number().required(),
  }),
  get: Joi.object({
    workspaceId: Joi.string().required(),
  }),
  update: Joi.object({
    workspaceId: Joi.string().required(),
    maxManagers: Joi.number().allow(null),
    maxCollaborators: Joi.number().allow(null),
    featureReviewers: Joi.number().allow(null),
  }),
};

export const workspaceUserValidationSchema = {
  create: Joi.object({
    workspaceId: Joi.string().required(),
    userId: Joi.string().required(),
    role: Joi.string().required(),
  }),
  getByUser: Joi.object({
    userId: Joi.string().required(),
  }),
  update: Joi.object({
    workspaceId: Joi.string().allow(null),
    userId: Joi.string().allow(null),
    role: Joi.string().allow(null),
  }),
};
