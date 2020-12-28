const { Router } = require('express');

const  { DispositivoController } = require('../controller');

const router = Router();

router.post('/dispositivo' , DispositivoController.cadastrarDispositivo);
router.put('/dispositivo/:token' , DispositivoController.ativarDispositivo);

module.exports = router;