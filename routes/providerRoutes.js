const express = require('express');
const router = express.Router();
const { getProviders, createProvider, updateProvider, deleteProvider } = require('../controllers/providerController');

router.get('/providers', getProviders);
router.post('/providers', createProvider);
router.patch('/providers/:id', updateProvider);
router.delete('/providers/:id', deleteProvider);

module.exports = router;
