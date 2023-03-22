const { expect } = require('chai');
const sinon = require('sinon');
const productsService = require('../../../src/services/productsService');

const productsModel = require('../../../src/models/productsModel');
const { allProducts } = require('./mocks/productsServiceMock');

describe('Testes de unidade do service de produtos', function () {
  it('Recuperando a lista de produtos', async function () {
    // Arrange
    sinon.stub(productsModel, 'getAllProducts').resolves(allProducts);

    // Act
    const result = await productsService.getAllProducts();
    // Assert
    expect(result).to.be.deep.equal(allProducts);
  });

  it('Recuperando um produto pelo Id', async function () {
    // Arrange
    sinon.stub(productsModel, 'getProductById').resolves(allProducts[0]);

    // Act
    const result = await productsService.getProductById(1);

    // Assert
    expect(result).to.be.deep.equal(allProducts[0]);
  });
  it('Verificando mensagem de "Not found" caso não encontre nenhum produto', async function () {
    // Arrange
    sinon.stub(productsModel, 'getProductById').resolves(undefined);
    // Act

    // Assert
    try {
      await productsService.getProductById(99); 
    } catch (error) {
      expect(error.message).to.be.deep.equal('Product not found');
      expect(error.type).to.be.equal(404);
    }
  });
  it('Verificando a mensagem caso não passe um id válido', async function () {
    sinon.stub(productsModel, 'getProductById').resolves(undefined);

    try {
      await productsService.getProductById('batata');
    } catch (error) {
      expect(error.message).to.be.deep.equal('"id" must be a number');
      expect(error.type).to.be.equal(422);
    }
  });
  it('Verificando se ao passar um nome correto, um novo produto é cadastrado', async function () {
    // Arrange
    sinon.stub(productsModel, 'getProductById').resolves(allProducts[0]);

    // Act
    const result = await productsService.getProductById(1);

    // Assert
    expect(result).to.be.deep.equal(allProducts[0]);
  });

  afterEach(function () {
    sinon.restore();
  });
});