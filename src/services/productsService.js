const productsModel = require('../models/productsModel');
const schema = require('./validations/validationsInputValues');

const getAllProducts = async () => {
  const result = await productsModel.getAllProducts();
  return result;
};

const getProductById = async (id) => {
  const error = schema.validateId(id);
  if (error.type) {
    return error;
  }

  const [product] = await productsModel.getProductById(id);
  if (!product) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }

  return { type: null, message: product };
};

module.exports = {
  getAllProducts,
  getProductById,
};