const { expect } = require('chai');
const sinon = require('sinon');
const productsService = require('../../../src/services/productsService');

const productsModel = require('../../../src/models/productsModel');
const { allProducts, newProduct } = require('./mocks/productsServiceMock');

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
    sinon.stub(productsModel, 'registerNewProduct').resolves(newProduct);

    // Act
    const result = await productsService.registerNewProduct('ProdutoX');

    // Assert
    expect(result).to.be.deep.equal(newProduct);
  });
  it('Verificando mensagem de erro caso não passe um id', async function () { 
    // Arrange
    sinon.stub(productsModel, 'registerNewProduct').resolves(undefined);
    // Act

    try {
      await productsService.registerNewProduct('');
    } catch (error) {
      expect(error.message).to.be.deep.equal('"name" is required');
      expect(error.type).to.be.equal(400);
    }
    // Assert
  });
  it('Verificando mensagem de erro caso passe um nome inválido', async function () {
    // Arrange
    sinon.stub(productsModel, 'registerNewProduct').resolves(undefined);
    // Act

    try {
      await productsService.registerNewProduct('Pro');
    } catch (error) {
      expect(error.message).to.be.deep.equal('"name" length must be at least 5 characters long');
      expect(error.type).to.be.equal(422);
    }
    // Assert
  });
  it('Verificando se é possível deletar uma venda com sucesso', async function () { 
    // Arrange
    sinon.stub(productsModel, 'deleteProduct').resolves(undefined);

    // Act
    const result = await productsService.deleteProduct(1);

    // Assert
    expect(result).to.be.deep.equal(undefined);
  });
  it('Verificando mensagem de "Not found" caso não encontre nenhum produto', async function () {
    // Arrange
    sinon.stub(productsModel, 'deleteProduct').resolves(undefined);

    // Act

    // Assert
    try {
      await productsService.deleteProduct(99);
    } catch (error) {
      expect(error.message).to.be.deep.equal('Product not found');
      expect(error.type).to.be.equal(404);
    }
  });
  describe('Testes de service para atualizar um produto', function () { 
    const updateReturn = { id: 1, name: 'Machado do Thor Stormbreaker' };
    it('Verifica se lança um erro ao não passar um name', async function () { 
      // Arrange
      sinon.stub(productsModel, 'updateProduct').resolves(undefined);
      // Act

      try {
        await productsService.updateProduct(1, '');
      } catch (error) {
        expect(error.message).to.be.deep.equal('"name" is required');
        expect(error.type).to.be.equal(400);
      }
      // Assert
    });
    it('Verifica se lança um erro ao passar um name com menos de 5 caracteres', async function () {
      // Arrange
      sinon.stub(productsModel, 'updateProduct').resolves(undefined);
      // Act

      try {
        await productsService.updateProduct(1, 'Bat');
      } catch (error) {
        expect(error.message).to.be.deep.equal('"name" length must be at least 5 characters long');
        expect(error.type).to.be.equal(422);
      }
      // Assert
    });
    it('Verifica se lança um erro ao não encontrar um produto pelo id', async function () {
      // Arrange
      sinon.stub(productsModel, 'updateProduct').resolves(undefined);
      // Act

      try {
        await productsService.updateProduct(50, 'Machado do Thor Stormbreaker');
      } catch (error) {
        expect(error.message).to.be.deep.equal('Product not found');
        expect(error.type).to.be.equal(404);
      }
      // Assert
    });
    it('Verifica se é possível retornar um objeto indicando que foi modificado', async function () {
      // Arrange
      sinon.stub(productsModel, 'updateProduct').resolves(updateReturn);

      // Act
      const result = await productsService.updateProduct(1, 'Machado do Thor Stormbreaker');

      // Assert
      expect(result).to.be.deep.equal(updateReturn);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});