import Joi from 'joi';

export const userJoiSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  fullName: Joi.string().required(),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})')) //
    .messages({
        'string.pattern.base': '"password" must contain at least one uppercase letter, one lowercase letter, and one digit',
        'string.min': '"password" must be at least {#limit} characters long',
      }),
}).required();

export const userLoginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})')) //
    .messages({
        'string.pattern.base': '"password" must contain at least one uppercase letter, one lowercase letter, and one digit',
        'string.min': '"password" must be at least {#limit} characters long',
      }),
}).required();