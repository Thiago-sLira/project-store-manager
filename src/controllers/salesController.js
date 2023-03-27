const salesService = require('../services/salesService');

const registerNewSale = async (req, res) => {
  const sales = req.body;
  const result = await salesService.registerNewSale(sales);

  return res.status(201).json(result);
};

const getSaleById = async (req, res) => { 
  const { id } = req.params;
  const result = await salesService.getSaleById(id);

  return res.status(200).json(result);
};

const getAllSales = async (_req, res) => { 
  const result = await salesService.getAllSales();
  
  return res.status(200).json(result);
};

const deleteSale = async (req, res) => { 
  const { id } = req.params;

  await salesService.deleteSale(id);

  return res.status(204).json();
};

module.exports = {
  registerNewSale,
  getSaleById,
  getAllSales,
  deleteSale,
};