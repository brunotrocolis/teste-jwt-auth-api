const { Usuario } = require('../models');
const AutenticacaoService = require('./AutenticacaoService');
const { situacao, mensagens } = require('../constants');

class UsuarioService {
    static GERAR_TOKEN = 'Gerar token';

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

        console.log('INICIO', this.GERAR_TOKEN );

        if (!email || !senha) {
            console.error('DADOS INSUFICIÊNTES');
            return {
                status: 400,
                auth: false,
                message: mensagens.DADOS_INSUFICIENTES
            };
        }

        const usuario = await this.findByEmail(email);

        if(!usuario) {
            console.error('USUÁRIO NÃO ENCONTRADO');
            return {
                status: 401,
                auth: false,
                message: mensagens.USUARIO_NAO_ENCONTRADO
            };
        }

        if(situacao.ATIVO !== usuario.situacao) {
            console.error('USUÁRIO ' + usuario.situacao);
            return {
                status: 401,
                auth: false,
                message: mensagens.SITUACAO_USUARIO_E + usuario.situacao
            };
        }

        if(!AutenticacaoService.validarSenha(senha, usuario.senha)) {
            console.error('SENHA INVÁLIDA');
            return {
                status: 401,
                auth: false,
                message: mensagens.SENHA_INVALIDA
            }
        }

        console.log('FIM', this.GERAR_TOKEN );

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