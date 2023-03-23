const connection = require('../db/connection');

const registerNewSale = async (sales) => {
  const querySales = 'INSERT INTO StoreManager.sales () VALUE ()';
  const [{ insertId }] = await connection.execute(querySales);

  const queryInsertSalesProducts = 'INSERT INTO StoreManager.sales_products';
  const columnsValues = '(`sale_id`, `product_id`, `quantity`) VALUE (?, ?, ?)';

  const promises = sales
    .map(({ productId, quantity }) =>
      connection.execute(`${queryInsertSalesProducts} ${columnsValues}`,
        [insertId, productId, quantity]));
  await Promise.all(promises);

  return {
    id: insertId,
    itemsSold: sales,
  };
};

module.exports = {
  registerNewSale,
};