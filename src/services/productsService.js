const productsModel = require('../models/productsModel');
const { mapError } = require('../utils/errorMap');
const errorMessage = require('../utils/errorMessage');
const schema = require('./validations/validationsInputValues');

const getAllProducts = async () => {
  const result = await productsModel.getAllProducts();
  return result;
};

const getProductById = async (id) => {
  const error = schema.validateId(id);
  if (error.type) {
    throw error;
  }

  const product = await productsModel.getProductById(id);
  if (!product) {
    throw errorMessage(mapError('PRODUCT_NOT_FOUND'), 'Product not found');
  }

  return product;
};

const registerNewProduct = async (name) => {
  if (!name) {
    throw errorMessage(mapError('NAME_IS_REQUIRED'), '"name" is required');
  }

  const error = schema.validateNameLength(name);
  if (error.type) {
    throw error;
  }

  const newProduct = await productsModel.registerNewProduct(name);
  return newProduct;
};

const updateProduct = async (id, newName) => { 
  if (!newName) {
    throw errorMessage(mapError('NAME_IS_REQUIRED'), '"name" is required');
  }

  const error = schema.validateNameLength(newName);
  if (error.type) {
    throw error;
  }

  const product = await productsModel.getProductById(id);
  if (!product) {
    throw errorMessage(mapError('PRODUCT_NOT_FOUND'), 'Product not found');
  }

  const upDatedProduct = await productsModel.updateProduct(id, newName);
  return upDatedProduct;
};

const deleteProduct = async (id) => { 
  const product = await productsModel.getProductById(id);
  if (!product) {
    throw errorMessage(mapError('PRODUCT_NOT_FOUND'), 'Product not found');
  }

  await productsModel.deleteProduct(id);
};

const findProductByQuery = async (query) => { 
  const result = await productsModel.findProductByQuery(query);

  if (!query) {
    const resultAll = await productsModel.getAllProducts();
    return resultAll;
  }

  return result;
};

module.exports = {
  getAllProducts,
  getProductById,
  registerNewProduct,
  updateProduct,
  deleteProduct,
  findProductByQuery,
};