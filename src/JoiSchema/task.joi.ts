import Joi from 'joi';

export const taskJoiSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  dueDate: Joi.date(),
});

export const updateTaskJoiSchema = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    dueDate: Joi.date(),
    completed:Joi.boolean()
  });
  
