const {Router} = require('express');
const router = Router();
const PainelController = require('../controllers/PainelController');

router
.get('/', PainelController.dashboard)
.get('/patch', PainelController.patch)
.get('/logout', PainelController.Logout)
.get('/checkout/pay', PainelController.Payment);

module.exports = router;