const { expect } = require('chai');
const sinon = require('sinon');
const salesService = require('../../../src/services/salesService');

const salesModel = require('../../../src/models/salesModel');
const { wrongSaleQuantityZero, wrongSaleProductNotFound, returnSuccessNewSale, successNewSale, allSales, saleById } = require('./mocks/salesServiceMock');

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
  it('Verifica se é possível recuperar a lista de vendas', async function () { 
    // Arrange
    sinon.stub(salesModel, 'getAllSales').resolves(allSales);

    // Act
    const result = await salesService.getAllSales();

    // Assert
    expect(result).to.be.deep.equal(allSales);
  });
  it('Verifica se é possível recuperar uma venda pelo id', async function () {
    // Arrange
    sinon.stub(salesModel, 'getSaleById').resolves(saleById);

    // Act
    const result = await salesService.getSaleById(1);

    // Assert
    expect(result).to.be.deep.equal(saleById);
  });
  it('Verifica se lança um erro ao passar um id inválido', async function () {
    // Arrange
    sinon.stub(salesModel, 'getSaleById').resolves(undefined);

    // Act
    
    // Assert
    try {
      await salesService.getSaleById('batata');
    } catch (error) {
      expect(error.message).to.be.deep.equal('"id" must be a number');
      expect(error.type).to.be.equal(422);
    }
  });
  it('Verifica se lança um erro caso não encontre nenhuma venda pelo id', async function () {
    // Arrange
    sinon.stub(salesModel, 'getSaleById').resolves([undefined]);

    // Act
    // Assert
    try {
      await salesService.getSaleById(50);
    } catch (error) {
      expect(error.message).to.be.deep.equal('Sale not found');
      expect(error.type).to.be.equal(404);
    }
  });
  it('Verifica se, ao deletar uma venda, lança um erro caso não encontre nenhuma venda pelo id ao deletar', async function () {
    // Arrange
    sinon.stub(salesModel, 'deleteSale').resolves(undefined);

    // Act
    // Assert
    try {
      await salesService.deleteSale(50);
    } catch (error) {
      expect(error.message).to.be.deep.equal('Sale not found');
      expect(error.type).to.be.equal(404);
    }
  });
  it('Verifica se é possível deletar uma venda pelo id', async function () {
    // Arrange
    sinon.stub(salesModel, 'deleteSale').resolves(undefined);

    // Act
    const result = await salesService.deleteSale(1);

    // Assert
    expect(result).to.be.deep.equal(undefined);
  });

  afterEach(function () {
    sinon.restore();
  });
});