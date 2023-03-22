const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const productsController = require('../../../src/controllers/productsController');

const productsService = require('../../../src/services/productsService');
const { allProducts } = require('./mocks/productsControllerMock');

chai.use(sinonChai);

const { expect } = chai;

describe('Testes de unidade do controller de produtos', function () {
  it('Recuperando a lista de produtos', async function () {
    // Arrange
    sinon.stub(productsService, 'getAllProducts').resolves(allProducts);

    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    // Act
    await productsController.getAllProducts(req, res);
    // Assert
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allProducts);
  });

  it('Recuperando um produto pelo Id', async function () {
    // Arrange
    sinon.stub(productsService, 'getProductById').resolves(allProducts[0]);

    const req = {
      params: {
        id: 1,
      }
    };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    // Act
    await productsController.getProductById(req, res);

    // Assert
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allProducts[0]);
  });

  afterEach(function () {
    sinon.restore();
  });
});