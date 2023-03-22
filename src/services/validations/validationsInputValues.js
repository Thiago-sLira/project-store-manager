const { mapError } = require('../../utils/errorMap');
const schema = require('./schema');

const validateId = (id) => {
  const { error } = schema.idSchema.validate(id);
  if (error) return { type: mapError('INVALID_VALUE'), message: '"id" must be a number' };

  return { type: null, message: '' };
};

const validateNameLength = (name) => {
  const { error } = schema.nameSchema.validate(name);
  if (error) {
    return {
      type: mapError('NAME_LENGTH_5'),
      message: '"name" length must be at least 5 characters long',
    };
  }

  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateNameLength,
};