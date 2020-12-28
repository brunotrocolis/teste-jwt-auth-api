const { Router } = require('express');

const UsuarioController = require('../controller/UsuarioController');

const router = Router();

router.post('/login', UsuarioController.login);
router.post('/usuario', UsuarioController.create);

module.exports = router;