const { Usuario } = require('../models');
const AutenticacaoService = require('./AutenticacaoService');

class UsuarioService {
    static async save(usuario) {
        try {
            usuario.senha = AutenticacaoService.criptografarSenha(usuario.senha);
            usuario.dataHoraCadastro = new Date();
            usuario.dataHoraUltimaatualizacao = new Date();
            return await Usuario.create(usuario);
        } catch (error) {
            console.log("Erro ao tentar salvar usuário", error.message);
            throw error;
        }
    }

    static async findByEmail(email) {
        try {
            return await Usuario.findOne({ where : { email }});
        } catch (error) {
            console.warn(error.message);
            return null;
        }
    }

    static async gerarToken(email, senha) {

        if (!email || !senha) {
            return {
                status: 400,
                auth: false,
                message: 'Dados insuficiêntes'
            };
        }

        const usuario = await this.findByEmail(email);

        if(!usuario) {
            return {
                status: 401,
                auth: false,
                message: 'Usuário não encontrado'
            };
        }

        if(!AutenticacaoService.validarSenha(senha, usuario.senha)) {
            return {
                status: 401,
                auth: false,
                message: 'Senha inválida'
            }
        }

        return {
            status: 200,
            auth: true,
            token: AutenticacaoService.gerarToken({id: usuario.id})
        }
    }

    static async exists(id) {
        return await Usuario.count({where: {id}}) > 0;
    }
}

module.exports = UsuarioService;