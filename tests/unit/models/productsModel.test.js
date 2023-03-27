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

  it('Vefifica se ocorre um update com sucesso', async function () { 
    // Arrange
    const updateReturn = { id: 1, name: 'Machado do Thor Stormbreaker' };
    
    sinon.stub(connection, 'execute').resolves(updateReturn);
    // Act
    const result = await productsModel.updateProduct(1, 'Machado do Thor Stormbreaker');
    // Assert
    expect(result).to.be.deep.equal(updateReturn);
  });

  it('Verfica se é possível deletar um produto com sucesso', async function () { 
    // Arrange
    sinon.stub(connection, 'execute').resolves(undefined);

    // Act
    const result = await productsModel.deleteProduct(1);

    // Assert
    expect(result).to.be.deep.equal(undefined);
  });

  afterEach(function () {
    sinon.restore();
  });
});