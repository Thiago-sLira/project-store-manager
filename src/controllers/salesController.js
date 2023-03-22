const salesService = require('../services/salesService');

const registerNewSale = async (req, res) => {
  const { sales } = req.body;
  const result = await salesService.registerNewSale(sales);

  return res.status(201).json(result);
};

module.exports = {
  registerNewSale,
};