const productsModel = require('../models/productsModel');
const salesModel = require('../models/salesModel');
const { mapError } = require('../utils/errorMap');
const errorMessage = require('../utils/errorMessage');
const schema = require('./validations/validationsInputValues');

const registerNewSale = async (sales) => {
  const quantity = schema.validateQuantity(sales);
  if (quantity.type) {
    throw errorMessage(quantity.type, quantity.message);
  }

  const product = await Promise.all(sales
    .map(({ productId }) => productsModel.getProductById(productId)));
  
  if (product.includes(undefined)) {
    throw errorMessage(mapError('PRODUCT_NOT_FOUND'), 'Product not found');
  }

  const newSale = await salesModel.registerNewSale(sales);
  return newSale;
};

const getSaleById = async (id) => { 
  const error = schema.validateId(id);
  if (error.type) {
    throw error;
  }

  const sale = await salesModel.getSaleById(id);
  if (!sale[0]) {
    throw errorMessage(mapError('SALE_NOT_FOUND'), 'Sale not found');
  }

  return sale;
};

const getAllSales = async () => { 
  const result = await salesModel.getAllSales();

  return result;
};

const deleteSale = async (id) => {
  const sale = await salesModel.getSaleById(id);
  if (!sale[0]) {
    throw errorMessage(mapError('SALE_NOT_FOUND'), 'Sale not found');
  }

  await salesModel.deleteSale(id);
};
 
const updateSale = async (id, saleData) => { 
  const sale = await salesModel.getSaleById(id);
  if (!sale[0]) {
    throw errorMessage(mapError('SALE_NOT_FOUND'), 'Sale not found');
  }

  const quantity = schema.validateQuantity(saleData);
  if (quantity.type) {
    throw errorMessage(quantity.type, quantity.message);
  }

  const product = await Promise.all(saleData
    .map(({ productId }) => productsModel.getProductById(productId)));

  if (product.includes(undefined)) {
    throw errorMessage(mapError('PRODUCT_NOT_FOUND'), 'Product not found');
  }

  const result = await salesModel.updateSale(id, saleData);

  return result;
};

module.exports = {
  registerNewSale,
  getSaleById,
  getAllSales,
  deleteSale,
  updateSale,
};