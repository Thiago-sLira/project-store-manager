const express = require('express');
const productsController = require('../controllers/productsController');

const router = express.Router();

router.use(express.json());

router.get('/search', productsController.findProductByQuery);

router.get('/', productsController.getAllProducts);

router.get('/:id', productsController.getProductById);

router.post('/', productsController.registerNewProduct);

router.put('/:id', productsController.updateProduct);

router.delete('/:id', productsController.deleteProduct);

module.exports = router;
