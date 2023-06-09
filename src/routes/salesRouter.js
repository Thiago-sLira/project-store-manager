const express = require('express');
const validateSalesEntryFields = require('../middlewares/validateSalesEntryFields');
const salesController = require('../controllers/salesController');

const router = express.Router();

router.use(express.json());

router.post('/', validateSalesEntryFields, salesController.registerNewSale);

router.get('/', salesController.getAllSales);

router.get('/:id', salesController.getSaleById);

router.delete('/:id', salesController.deleteSale);

router.put('/:id', validateSalesEntryFields, salesController.updateSale);

module.exports = router;
