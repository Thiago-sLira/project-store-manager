const express = require('express');
const productsController = require('../controllers/productsController');

const router = express.Router();

router.use(express.json());

router.get('/', productsController.getAllProducts);

router.get('/:id', productsController.getProductById);

module.exports = router;
