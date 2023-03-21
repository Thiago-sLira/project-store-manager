const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../src/models/productsModel');

const connection = require('../../../src/db/connection');
const { allProducts } = require('./mocks/productsModelMock');

describe('Testes de unidade do model de produtos', function() {
  it('Recuperando a lista de produtos', async function() {
    // Arrange
    sinon.stub(connection, 'execute').resolves([allProducts]);
    // const res = {};
    // const req = {};

    // res.status = sinon.stub().returns(res);
    // res.json = sinon.stub().returns();

    // Act
    const result = await productsModel.getAllProducts();
    // Assert
    expect(result).to.be.deep.equal(allProducts);
  });

  it('Recuperando um produto pelo Id', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([[allProducts[0]]]);

    const result = await productsModel.getProductById(1);

    expect(result).to.be.deep.equal(allProducts[0]);
  });

  afterEach(function () {
    sinon.restore();
  });
});