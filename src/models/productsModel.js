const connection = require('../db/connection');

const getAllProducts = async () => {
  const query = 'SELECT * FROM StoreManager.products';
  const [result] = await connection.execute(query);
  return result;
};

const getProductById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [[result]] = await connection.execute(query, [id]);
  return result;
};

const registerNewProduct = async (name) => {
  const query = 'INSERT INTO StoreManager.products (`name`) VALUE (?)';
  const [{ insertId }] = await connection.execute(query, [name]);

  return {
    id: insertId,
    name,
  };
};

const updateProduct = async (id, newName) => {
  const query = 'UPDATE StoreManager.products SET name = ? WHERE id = ?';
  await connection.execute(query, [newName, id]);

  return {
    id,
    name: newName,
  };
};

const deleteProduct = async (id) => {
  const query = 'DELETE FROM StoreManager.products WHERE id = ?';

  await connection.execute(query, [id]);
};

const findProductByQuery = async (query) => {
  const querySQL = 'SELECT * FROM StoreManager.products WHERE name LIKE ?';
  const [result] = await connection.execute(querySQL, [`%${query}%`]);

  return result;
};

module.exports = {
  getAllProducts,
  getProductById,
  registerNewProduct,
  updateProduct,
  deleteProduct,
  findProductByQuery,
};
