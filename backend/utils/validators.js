const validator = require('validator');
const { Segments } = require('celebrate');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const isUrlVaild = (value, helpers) => (
  validator.isURL(value) ? value : helpers.error('string.uri'));

const getUserAuthSchema = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2).max(200),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(isUrlVaild),
  }),
};

const getCurrentUserSchema = {
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi.objectId().required(),
  }),
};

const updateUserSchema = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
};

const updateAvatarSchema = {
  body: Joi.object().keys({
    avatar: Joi.string().custom(isUrlVaild),
  }),
};

const getCreateCardsSchema = {
  body: Joi.object().keys({
    name: Joi.string().max(30).min(2).required(),
    link: Joi.string().custom(isUrlVaild),
    owner: Joi.objectId().required(),
    likes: Joi.array(),
  }),
};

const getDeleteCardsSchema = {
  body: Joi.object().keys({
    owner: Joi.objectId().required(),
  }),
};

const getLikeCard = {
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.objectId().required(),
  }),
};

module.exports = {
  getUserAuthSchema,
  getCurrentUserSchema,
  updateUserSchema,
  updateAvatarSchema,
  getCreateCardsSchema,
  getDeleteCardsSchema,
  getLikeCard,
};
