const productsService = require('../services/productsService');

const getAllProducts = async (_req, res) => {
  try {
    const result = await productsService.getAllProducts();
    return res.status(201).json(result);
  } catch (error) {
    return res.status(404).json();
  }
};

module.exports = {
  getAllProducts,
};