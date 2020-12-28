const { UsuarioService } = require('../service');

module.exports = class UsuarioController {

    static async login (req, res) {

        const {email, senha} = req.body;

        const {status, auth, message, token} = await UsuarioService.gerarToken(email, senha);

        return res.status(status).json({auth, message, token});

    }

    static async create(req, res) {
        var usuario = req.body;
        try{
            return res.status(200).json(await UsuarioService.save(usuario));
        } catch (error) {
            return res.status(500).json({error: true, message: error.message});
        }
    }
   
}