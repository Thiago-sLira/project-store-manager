const salesModel = require('../models/salesModel');
const { mapError } = require('../utils/errorMap');
const errorMessage = require('../utils/errorMessage');
const schema = require('./validations/validationsInputValues');
const verifyProduct = require('./validations/verifyProducts');

const registerNewSale = async (sales) => { 
  const quantity = schema.validateQuantity(sales);
  if (quantity.type) {
    throw errorMessage(quantity.type, quantity.message);
  }

  const productsDB = await salesModel.getAllProducts();
  const product = verifyProduct(sales, productsDB);
  if (product) {
    throw errorMessage(mapError('PRODUCT_NOT_FOUND'), 'Product not found');
  }

  const newSale = await salesModel.registerNewSale(sales);
  return newSale;
};

module.exports = {
  registerNewSale,
};