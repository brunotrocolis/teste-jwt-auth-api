const {DispositivoService} = require('../service');

class DispositivoController {
    static async cadastrarDispositivo(req, res) {
        const {status, message, dispositivo} = DispositivoService.salvar(req.body);
        return res.status(status).json({message, dispositivo});
    }

    static async ativarDispositivo(req, res) {
        const token = req.params.token;
        const { status, message } = await DispositivoService.ativar(token);
        return res.status(status).json({message});
    }
}

module.exports = DispositivoController;