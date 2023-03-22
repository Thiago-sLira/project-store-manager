const errorHandler = (error, _req, res, _next) => {
  console.log(error);
  if (error.type) {
    return res.status(error.type).json({ message: error.message });
  }
  res.status(500).json({ message: 'Internal server error' });
};

module.exports = errorHandler;