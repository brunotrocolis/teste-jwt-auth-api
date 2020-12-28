const jwt = require('jsonwebtoken');
const crypto = require('crypto');

class AutenticacaoService {

    static criptografarSenha(senha) {
        var hash = crypto.createHmac('sha512', process.env.CPT_PASS);
        hash.update(senha);
        senha = hash.digest('hex');
        return senha;
    }

    static validarSenha(senha, senhaCriptografada) {
        return senhaCriptografada === this.criptografarSenha(senha);
    }

    static gerarToken( payload ) {
        return jwt.sign(payload, process.env.JWT_PASS, {expiresIn: Number(process.env.JWT_TIME)});
    }

    static validarToken(req, res, next) {
        const token = req.headers['x-access-token'];

        if (!token) {
            return res.status(401).json({auth: false, message: 'No token provided.'});
        }

        jwt.verify(token, process.env.JWT_PASS, (err, decoded) => {
            if (err) {
                return res.status(401).json({auth: false, message: err});
            }
            req.id = decode.id;
            next();
        });
    }
}

module.exports = AutenticacaoService;