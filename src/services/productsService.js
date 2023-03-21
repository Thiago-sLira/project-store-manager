const productsModel = require('../models/productsModel');

const getAllProducts = async () => {
  const result = await productsModel.getAllProducts();
  return result;
};

module.exports = {
  getAllProducts,
};