const { expect } = require('chai');
const sinon = require('sinon');
const salesModel = require('../../../src/models/salesModel');

const connection = require('../../../src/db/connection');
const { returnSuccessNewSale, successNewSale } = require('./mocks/salesModelMock');

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
});