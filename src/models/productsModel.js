const connection = require('../db/connection');

const getAllProducts = async () => {
  const query = 'SELECT * FROM StoreManager.products';
  const [result] = await connection.execute(query);
  return result;
};

module.exports = {
  getAllProducts,
};
