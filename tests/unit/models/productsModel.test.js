const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../src/models/productsModel');

const connection = require('../../../src/db/connection');
const { allProducts, newProduct } = require('./mocks/productsModelMock');

describe('Testes de unidade do model de produtos', function() {
  it('Recuperando a lista de produtos', async function() {
    // Arrange
    sinon.stub(connection, 'execute').resolves([allProducts]);

    // Act
    const result = await productsModel.getAllProducts();

    // Assert
    expect(result).to.be.deep.equal(allProducts);
  });

  it('Recuperando um produto pelo Id', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([[allProducts[0]]]);

    // Act
    const result = await productsModel.getProductById(1);

    // Assert
    expect(result).to.be.deep.equal(allProducts[0]);
  });

  it('Cadastrando um novo produto', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
    // Act
    const result = await productsModel.registerNewProduct('ProdutoX');
    // Assert
    expect(result).to.be.deep.equal(newProduct);
  });

  afterEach(function () {
    sinon.restore();
  });
});