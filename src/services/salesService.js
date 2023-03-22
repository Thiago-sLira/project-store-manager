const salesModel = require('../models/salesModel');
const { mapError } = require('../utils/errorMap');
const errorMessage = require('../utils/errorMessage');
const schema = require('./validations/validationsInputValues');

const registerNewSale = async (sales) => { 
  const quantity = schema.validateQuantity(sales);
  if (quantity.type) {
    throw errorMessage(quantity.type, quantity.message);
  }

  const product = sales.some(({ productId }) => !salesModel.findProductByID(productId));
  if (product) {
    throw errorMessage(mapError('PRODUCT_NOT_FOUND'), 'Product not found');
  }

  const newSale = await salesModel.registerNewSale(sales);
  return newSale;
};

module.exports = {
  registerNewSale,
};