const {Router} = require('express');
const router = Router();
const MercadoPagoController = require('../controllers/MercadoPagoController');

router
.post('/notify', MercadoPagoController.Notify);

module.exports = router;