const productsService = require('../services/productsService');
const errorMap = require('../utils/errorMap');

const getAllProducts = async (_req, res, next) => {
  try {
    const result = await productsService.getAllProducts();
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const result = await productsService.getProductById(id);

  if (result.type) {
    return res.status(errorMap.mapError(result.type)).json(result);
  }

  res.status(200).json(result.message);
};

module.exports = {
  getAllProducts,
  getProductById,
};