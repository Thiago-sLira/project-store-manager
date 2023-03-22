const productsService = require('../services/productsService');
// const errorMap = require('../utils/errorMap');

const getAllProducts = async (_req, res) => {
    const result = await productsService.getAllProducts();
    return res.status(200).json(result);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const result = await productsService.getProductById(id);

  res.status(200).json(result);
};

module.exports = {
  getAllProducts,
  getProductById,
};