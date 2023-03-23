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
]

module.exports = {
  returnSuccessNewSale,
  successNewSale,
  wrongSaleQuantityZero,
  wrongSaleEmptyProductId,
  wrongSaleEmptyQuantity,
  wrongSaleProductNotFound,
}