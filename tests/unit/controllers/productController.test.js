const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const productsController = require('../../../src/controllers/productsController');

const productsService = require('../../../src/services/productsService');
const { allProducts, newProduct } = require('./mocks/productsControllerMock');

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

  it('Cadastrando um novo produto', async function () {
    // Arrange
    sinon.stub(productsService, 'registerNewProduct').resolves(newProduct);

    const req = {
      body: {
        name: 'ProdutoX',
      }
    };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    // Act
    await productsController.registerNewProduct(req, res);

    // Assert
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newProduct);
  });

  it('Verifica se retorna o status correto ao atualizar um produto', async function () {
    // Arrange
    const updateReturn = { id: 1, name: 'Machado do Thor Stormbreaker' };
    sinon.stub(productsService, 'updateProduct').resolves(updateReturn);

    const req = {
      body: {
        name: 'Machado do Thor Stormbreaker',
      },
      params: {
        id: 1,
      }
    };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    // Act
    await productsController.updateProduct(req, res);

    // Assert
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(updateReturn);
  });

  it('Verifica se é possível deletar um produto com sucesso', async function () { 
    // Arrange
    sinon.stub(productsService, 'deleteProduct').resolves(undefined);

    const req = {
      params: {
        id: 1,
      },
    };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    // Act
    await productsController.deleteProduct(req, res);

    // Assert
    expect(res.status).to.have.been.calledWith(204);
    expect(res.json).to.have.been.calledWith();
  });

  afterEach(function () {
    sinon.restore();
  });
});