const schema = require('./schema');

const validateId = (id) => {
  const { error } = schema.idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };

  return { type: null, message: '' };
};

module.exports = {
  validateId,
};