import Joi from "joi";
import validator from "express-joi-validation";

export const routerValidator = validator.createValidator({});

export const registerWalletValidation = Joi.object().keys({
  username: Joi.string().required(),
  name: Joi.string().required(),
  password: Joi.string().required(),
  countryCode: Joi.string().required(),
});

export const loginWalletValidation = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const addRatingValidation = Joi.object().keys({
  rating: Joi.number().required(),
  pfiDid: Joi.string().required(),
  pfi: Joi.string().required(),
  comment: Joi.string().optional(),
});

export const getSingleRatingValidation = Joi.object().keys({
  ratingId: Joi.string().required(),
});

export const getPfiRatingValidation = Joi.object().keys({
  pfiDid: Joi.string().required(),
});

export const getTranasctionByIdValidation = Joi.object().keys({
  transactionId: Joi.string().required(),
});

export const getPfiOfferingsValidation = Joi.object().keys({
  to: Joi.string().required(),
  from: Joi.string().required(),
});
