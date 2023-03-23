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

const getSaleById = () => { };

const getAllSales = async () => {
  const querySELECT = 'SELECT salpro.sale_id AS saleId, sal.date, salpro.product_id AS productId';
  const queryFROM = 'salpro.quantity AS quantity FROM StoreManager.sales AS sal ';
  const queryJOIN = 'INNER JOIN StoreManager.sales_products AS salpro ON sal.id = salpro.sale_id';
  const [result] = await connection.execute(`${querySELECT}, ${queryFROM} ${queryJOIN}`);
  return result;
};

module.exports = {
  registerNewSale,
  getSaleById,
  getAllSales,
};