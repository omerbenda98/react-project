import Joi from "joi";

const registerSchema = Joi.object({
  firstName: Joi.string().min(2).max(256).required(),
  middleName: Joi.string().min(2).max(256).allow(""),
  lastName: Joi.string().min(2).max(256).required(),
  phone: Joi.string().min(9).max(14).required(),
  email: Joi.string()
    .min(6)
    .max(256)
    .required()
    .email({ tlds: { allow: false } }),
  password: Joi.string().min(6).max(1024).required(),
  imageUrl: Joi.string().min(6).max(1024).allow(""),
  imageAlt: Joi.string().min(6).max(256).allow(""),
  state: Joi.string().min(2).max(256).allow(""),
  country: Joi.string().min(2).max(256).required(),
  city: Joi.string().min(2).max(256).required(),
  street: Joi.string().min(2).max(256).required(),
  houseNumber: Joi.string().min(1).max(256).required(),
  zipCode: Joi.number().min(1).max(99999999).allow(""),
  biz: Joi.boolean(),
});

const validateRegisterSchema = (inputToValidate) => {
  const { error } = registerSchema.validate(inputToValidate, {
    abortEarly: false,
  });
  if (!error) {
    return null;
  }

  const errors = {};
  error.details.forEach((detail) => {
    errors[detail.path[0]] = detail.message;
  });
  return errors;
};

export default validateRegisterSchema;
