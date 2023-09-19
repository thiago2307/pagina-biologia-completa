const express = require('express');
const router = express.Router();
const adnsController = require('../controllers/myController');

router.get('/adns', adnsController.getAdns);

router.get('/adns/:id', adnsController.getAdnById);

router.post('/adns', adnsController.createAdn);

router.post('/adns/:id/eliminar', adnsController.deleteAdn);

module.exports = router;