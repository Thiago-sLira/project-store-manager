const validateSalesEntryFields = (req, res, next) => {
  const { sales } = req.body;
  const verifyProductId = sales.some(({ productId }) => !productId);
  if (verifyProductId) {
    return res.status(400).json({ message: '"productId" is required' });
  }

  const verifyQuantity = sales.some(({ quantity }) => !quantity);
  if (verifyQuantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  next();
};

module.exports = validateSalesEntryFields;