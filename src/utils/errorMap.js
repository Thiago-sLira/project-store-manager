const errorMap = {
  PRODUCT_NOT_FOUND: 404,
  SALE_NOT_FOUND: 404,
  INVALID_VALUE: 422,
  NAME_IS_REQUIRED: 400,
  NAME_LENGTH_5: 422,
  QUANTITY_VALUE_INVALID: 422,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};
