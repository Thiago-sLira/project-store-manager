const { expect } = require('chai');
const sinon = require('sinon');
const salesService = require('../../../src/services/salesService');

const salesModel = require('../../../src/models/salesModel');
const { wrongSaleQuantityZero, wrongSaleProductNotFound, returnSuccessNewSale, successNewSale } = require('./mocks/salesServiceMock');

describe('Testes de unidade de sales service', function () { 
  it('Verifica se lança um erro ao não encontrar uma chave "productId"', async function () {
    // Arrange
    // sinon.stub(salesModel, 'registerNewSale').resolves(undefined);
    // Act

    // try {
    //   await salesService.registerNewSale()
    // } catch (error) {
      
    // }
    // Assert
  });
  
  it('Verifica se lança um erro ao não encontrar uma chave "quantity"', async function () { 
    // Arrange
    // Act
    // Assert
  });

  it('Verifica se lança um erro ao encontrar um valor "0" na chave quantity', async function () { 
    // Arrange
    sinon.stub(salesModel, 'registerNewSale').resolves(undefined);
    // Act
    try {
      await salesService.registerNewSale(wrongSaleQuantityZero);
    } catch (error) {
      expect(error.message).to.be.deep.equal('"quantity" must be greater than or equal to 1');
      expect(error.type).to.be.equal(422);
    }
    // Assert
  });

  it('Verifica se lança um erro ao não encontrar um produto no banco de dados', async function () { 
    // Arrange
    sinon.stub(salesModel, 'registerNewSale').resolves(undefined);
    // Act
    try {
      await salesService.registerNewSale(wrongSaleProductNotFound);
    } catch (error) {
      expect(error.message).to.be.deep.equal('Product not found');
      expect(error.type).to.be.equal(404);
    }
    // Assert
  });
  it('Verifica se é possível passar por todas as validações com resultado correto', async function () { 
    sinon.stub(salesModel, 'registerNewSale').resolves(returnSuccessNewSale);

    const result = await salesService.registerNewSale(successNewSale);

    expect(result).to.be.deep.equal(returnSuccessNewSale);
  });

  afterEach(function () {
    sinon.restore();
  });
});