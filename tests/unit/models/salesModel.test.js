const { expect } = require('chai');
const sinon = require('sinon');
const salesModel = require('../../../src/models/salesModel');

const connection = require('../../../src/db/connection');
const { returnSuccessNewSale, successNewSale, allSales, saleById } = require('./mocks/salesModelMock');

describe('Testes de unidade para model de sales', function () {
  it('Cadastrando uma nova nova venda com sucesso', async function () {
    // Arrange
    sinon.stub(connection, 'execute')
      .onFirstCall()
      .resolves([{ insertId: 1 }])
      .onSecondCall()
      .resolves(returnSuccessNewSale);
    // Act
    const result = await salesModel.registerNewSale(successNewSale);
    // Assert
    expect(result).to.be.deep.equal(returnSuccessNewSale);
  });
  it('Verifica se é possível listar todas as vendas', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([allSales]);
    
    // Act
    const result = await salesModel.getAllSales();

    // Assert
    expect(result).to.be.deep.equal(allSales);
  });
  it('Verifica se é possível listar uma venda pelo id', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([saleById]);

    // Act
    const result = await salesModel.getSaleById(1);

    // Assert
    expect(result).to.be.deep.equal(saleById);
  });
  it('Verifica se é posśivel deletar uma venda com sucesso', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves(undefined);

    // Act
    const result = await salesModel.deleteSale(1);

    // Assert
    expect(result).to.be.deep.equal(undefined);
  });

  afterEach(function () {
    sinon.restore();
  });
});