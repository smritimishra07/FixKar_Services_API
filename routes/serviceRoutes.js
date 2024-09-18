const express = require('express');
const router = express.Router();
const { getServices, createService, updateService, deleteService } = require('../controllers/serviceController');

router.get('/', getServices);
router.post('/createService', createService);
router.patch('/updateService/:id', updateService);
router.delete('/deleteService/:id', deleteService);

module.exports = router;
