const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const salesController = require('../../../src/controllers/salesController');

const salesService = require('../../../src/services/salesService');
const { returnSuccessNewSale, successNewSale } = require('./mocks/salesControllerMock');

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
});