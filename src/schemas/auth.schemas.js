import joi from 'joi';

export const signUpSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: [
    joi.string().required().min(3), 
    joi.number().required().min(3)
  ]
});

export const signInSchema = joi.object({
  email: joi.string().email().required(),
  password: [
    joi.string().required(), 
    joi.number().required()
  ]
});