import Joi from "joi";

import validation from "./validation";

const editCardSchema = Joi.object({
  name: Joi.string().min(2).max(256).required(),
  age: Joi.string().min(1).max(256).required(),
  breed: Joi.string().min(2).max(256).required(),
  description: Joi.string().min(2).max(1024).required(),
  country: Joi.string().min(2).max(256).required(),
  city: Joi.string().min(2).max(256).required(),
  phone: Joi.string().min(9).max(14).required(),
  email: Joi.string()
    .min(5)
    .max(255)
    .required()
    .email({ tlds: { allow: false } }),
  imageUrl: Joi.string().min(6).max(1024).allow(""),
});

const editCardParamsSchema = Joi.object({
  id: Joi.string().min(1).required(),
});

const validateEditSchema = (userInput) => validation(editCardSchema, userInput);

const validateEditCardParamsSchema = (userInput) =>
  validation(editCardParamsSchema, userInput);

export { validateEditCardParamsSchema };

export default validateEditSchema;
