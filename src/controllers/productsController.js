const productsService = require('../services/productsService');

const getAllProducts = async (_req, res) => {
  const result = await productsService.getAllProducts();

  return res.status(200).json(result);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const result = await productsService.getProductById(id);

  return res.status(200).json(result);
};

const registerNewProduct = async (req, res) => {
  const { name } = req.body;
  const result = await productsService.registerNewProduct(name);

  return res.status(201).json(result);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const result = await productsService.updateProduct(id, name);

  return res.status(200).json(result);
};

module.exports = {
  getAllProducts,
  getProductById,
  registerNewProduct,
  updateProduct,
};