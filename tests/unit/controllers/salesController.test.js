const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const salesController = require('../../../src/controllers/salesController');

const salesService = require('../../../src/services/salesService');
const { returnSuccessNewSale, successNewSale, saleById, allSales } = require('./mocks/salesControllerMock');

chai.use(sinonChai);

const { expect } = chai;

describe('Testes de unidade do controller de sales', function () { 
  it('Verifica se retorna o status correto para registrar uma venda', async function () {
    // Arrange
    sinon.stub(salesService, 'registerNewSale').resolves(returnSuccessNewSale);

    const req = {
      body: successNewSale,
    };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    // Act
    await salesController.registerNewSale(req, res);

    // Assert
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(returnSuccessNewSale);
  });
  it('Verifica se retorna uma lista com todas as vendas', async function () {
    // Arrange
    sinon.stub(salesService, 'getAllSales').resolves(allSales);

    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    // Act
    await salesController.getAllSales(req, res);

    // Assert
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allSales);
  });
  it('Verifica se retorna uma venda pelo id', async function () {
    // Arrange
    sinon.stub(salesService, 'getSaleById').resolves(saleById);

    const req = {
      params: {
        id: 1,
      }
    };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    // Act
    await salesController.getSaleById(req, res);

    // Assert
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(saleById);
  });

  afterEach(function () {
    sinon.restore();
  });
});