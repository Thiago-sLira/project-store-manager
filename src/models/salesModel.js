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

const getSaleById = async (id) => { 
  const querySELECT = 'SELECT sal.date AS date, salpro.product_id AS productId, salpro.quantity ';
  const queryFROM = 'AS quantity FROM StoreManager.sales AS sal INNER JOIN StoreManager.';
  const queryJOIN = 'sales_products AS salpro ON sal.id = salpro.sale_id WHERE salpro.sale_id = ?';

  const [result] = await connection.execute(`${querySELECT} ${queryFROM} ${queryJOIN}`, [id]);
  return result;
};

const getAllSales = async () => {
  const querySELECT = 'SELECT salpro.sale_id AS saleId, sal.date, salpro.product_id AS productId';
  const queryFROM = 'salpro.quantity AS quantity FROM StoreManager.sales AS sal ';
  const queryJOIN = 'INNER JOIN StoreManager.sales_products AS salpro ON sal.id = salpro.sale_id';

  const [result] = await connection.execute(`${querySELECT}, ${queryFROM} ${queryJOIN}`);
  return result;
};

const deleteSale = async (id) => { 
  const firstQuery = 'DELETE FROM StoreManager.sales_products WHERE sale_id = ?';
  const secondQuery = 'DELETE FROM StoreManager.sales WHERE id = ?';
  const queries = [firstQuery, secondQuery];

  const promises = queries.map((query) => connection.execute(query, [id]));

  await Promise.all(promises);
};

const updateSale = async (id, saleData) => {
  const query = `UPDATE StoreManager.sales_products 
  SET quantity = ? WHERE sale_id = ? AND product_id = ?`;

  const promises = saleData.map(({ productId, quantity }) =>
    connection.execute(query, [quantity, id, productId]));
  
  await Promise.all(promises);

  return {
    saleId: id,
    itemsUpdated: saleData,
  };
 };

module.exports = {
  registerNewSale,
  getSaleById,
  getAllSales,
  deleteSale,
  updateSale,
};