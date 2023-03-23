const returnSuccessNewSale = {
  id: 1,
  itemsSold: [
    {
      productId: 1,
      quantity: 2
    },
    {
      productId: 2,
      quantity: 5
    }
  ]
};

const successNewSale = [
  {
    productId: 1,
    quantity: 2
  },
  {
    productId: 2,
    quantity: 5
  }
];

const wrongSaleQuantityZero = [
  {
    productId: 1,
    quantity: 0
  },
  {
    productId: 2,
    quantity: 5
  }
];

const wrongSaleEmptyProductId = [
  {
    quantity: 2
  },
  {
    productId: 2,
    quantity: 5
  }
];

const wrongSaleEmptyQuantity = [
  {
    productId: 2,
  },
  {
    productId: 2,
    quantity: 5
  }
];

const wrongSaleProductNotFound = [
  {
    productId: 21563,
    quantity: 3
  },
  {
    productId: 2,
    quantity: 5
  }
];

const allSales = [
  {
    saleId: 1,
    date: "2023-03-23T18:37:33.000Z",
    productId: 1,
    quantity: 5
  },
  {
    saleId: 1,
    date: "2023-03-23T18:37:33.000Z",
    productId: 2,
    quantity: 10
  },
  {
    saleId: 2,
    date: "2023-03-23T18:37:33.000Z",
    productId: 3,
    quantity: 15
  }
];

const saleById = [
  {
    date: "2023-03-23T18:37:33.000Z",
    productId: 1,
    quantity: 5
  },
  {
    date: "2023-03-23T18:37:33.000Z",
    productId: 2,
    quantity: 10
  }
];

module.exports = {
  returnSuccessNewSale,
  successNewSale,
  wrongSaleQuantityZero,
  wrongSaleEmptyProductId,
  wrongSaleEmptyQuantity,
  wrongSaleProductNotFound,
  allSales,
  saleById
};
