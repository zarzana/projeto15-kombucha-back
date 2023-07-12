import joi from 'joi';

export const postProductSchema = joi.object({
  title: joi.string().required(),
  description: joi.string().min(20).required(),
  price: joi.number().min(1).positive().required(),
  stock: joi.number().min(0).integer().required(),
  imgUrl: joi.string().required()
});

export const putProductShema = joi.number().required();