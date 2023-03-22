const connection = require('../db/connection');

const getAllProducts = async () => {
  const query = 'SELECT * FROM StoreManager.products';
  const [result] = await connection.execute(query);
  return result;
};

const registerNewSale = async (sales) => {
  const querySales = 'INSERT INTO StoreManager.sales () VALUE ()';
  const [{ insertId }] = await connection.execute(querySales);

  const queryInsertSalesProducts = 'INSERT INTO StoreManager.sales_products';
  const columnsValues = '(`sale_id`, `product_id`, `quantity`) VALUE (?, ?, ?)';

  const promises = sales.map(async ({ productId, quantity }) => {
    await connection.execute(
      `${queryInsertSalesProducts} ${columnsValues}`,
      [insertId, productId, quantity],
    );
  });
  await Promise.all(promises);

  return {
    id: insertId - 1,
    itemsSold: sales,
  };
};

module.exports = {
  registerNewSale,
  getAllProducts,
};