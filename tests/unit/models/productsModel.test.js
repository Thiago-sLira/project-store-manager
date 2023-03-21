const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models/productsModel');

const connection = require('../../../src/db/connection');
const { allProducts, productById } = require('./mocks/productsModelMock');

describe('Testes de unidade do model de produtos', function() {
  it('Recuperando a lista de produtos', function() {
    // Arrange
    sinon.stub(connection, 'execute').resolves();
    // Act
    // Assert
  });
});