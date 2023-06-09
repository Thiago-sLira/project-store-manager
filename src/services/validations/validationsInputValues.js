const { mapError } = require('../../utils/errorMap');
const schema = require('./schema');

const validateId = (id) => {
  const { error } = schema.idSchema.validate(id);
  if (error) return { type: mapError('INVALID_VALUE'), message: '"id" must be a number' };

  return { type: null, message: '' };
};

const validateNameLength = (name) => {
  const { error } = schema.nameLengthSchema.validate(name);
  if (error) {
    return {
      type: mapError('NAME_LENGTH_5'),
      message: '"name" length must be at least 5 characters long',
    };
  }

  return { type: null, message: '' };
};

const validateQuantity = (sales) => {
  const verifyQuantity = sales.some(({ quantity }) => Number(quantity) <= 0);
  if (verifyQuantity) {
    return {
      type: mapError('QUANTITY_VALUE_INVALID'),
      message: '"quantity" must be greater than or equal to 1',
    };
  }

  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateNameLength,
  validateQuantity,
};