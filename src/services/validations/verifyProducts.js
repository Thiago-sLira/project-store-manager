const verifyProduct = (sales, productsDB) => {
  for (let index = 0; index < sales.length; index += 1) {
    if (productsDB.some(({ id }) => Number(id) === sales[index].productId)) {
      return false;
    }
    return true;
  }
};

module.exports = verifyProduct;
