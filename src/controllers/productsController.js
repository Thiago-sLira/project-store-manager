const productsService = require('../services/productsService');

const getAllProducts = async (_req, res, next) => {
  try {
    const result = await productsService.getAllProducts();
    return res.status(201).json(result);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllProducts,
};