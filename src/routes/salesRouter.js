const express = require('express');
const validateSalesEntryFields = require('../middlewares/validateSalesEntryFields');
const salesController = require('../controllers/salesController');

const router = express.Router();

router.use(express.json());

router.post('/', validateSalesEntryFields, salesController.registerNewSale);

module.exports = router;
