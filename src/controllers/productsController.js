const productsService = require('../services/productsService');
const errorMap = require('../utils/errorMap');

const getAllProducts = async (_req, res, next) => {
  try {
    const result = await productsService.getAllProducts();
    return res.status(201).json(result);
  } catch (error) {
    return next(error);
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.getProductById(id);

  if (type) {
    return res.status(errorMap.mapError(type)).json(message);
  }

  res.status(200).json(message);
};

module.exports = {
  getAllProducts,
  getProductById,
};