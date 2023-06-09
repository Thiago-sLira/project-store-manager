const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();
const nameLengthSchema = Joi.string().min(5).max(45).required();

module.exports = {
  idSchema,
  nameLengthSchema,
};