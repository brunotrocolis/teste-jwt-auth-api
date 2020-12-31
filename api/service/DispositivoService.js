const {Dispositivo, Usuario} = require('../models');
const {situacao, mensagens } = require('../constants');
const crypto = require('crypto');

class DispositivoService {
    static CADASTRAR_DISPOSITIVO = 'CADASTRAR DISPOSITIVO';
    static ATIVAR_DISPOSITIVO = 'ATIVAR DISPOSITIVO';

    static async salvar(dispositivo) {
        console.log('INICIO', this.CADASTRAR_DISPOSITIVO);
        dispositivo.situacao = situacao.INATIVO;
        dispositivo.dataHoraCadastro = new Date();
        dispositivo.dataHoraUltimaatualizacao = new Date();

        try {
            if (await Usuario.count({where: {id: dispositivo.usuario}}) <= 0) {
                return {
                    status: 400,
                    message: mensagens.USUARIO_NAO_ENCONTRADO
                }
            }
            dispositivo = await Dispositivo.create(dispositivo);
            console.log('FIM', this.CADASTRAR_DISPOSITIVO);
            return {
                status: 200,
                dispositivo
            }
        } catch (error) {
            console.error(error.message);
            return {
                status: 500,
                message: erro.message
            }
        }
    }

    static gerarTokenAtivacao(id) {
        const cipher = crypto.createCipher('aes256', process.env.DIS_PAS);
        cipher.update(String(id));
        return cipher.final('hex');
    }

    static recuprarIdAtivacao(token) {
        var decipher = crypto.createDecipher('aes256', process.env.DIS_PAS);
        decipher.update(token, 'hex', 'utf8');
        return Number(decipher.final('utf8'));
    }

    static async ativar(token) {
        console.log('INICIO', this.ATIVAR_DISPOSITIVO);
        let id = null;
        try {
            id = this.recuprarIdAtivacao(token);
        } catch (error) {
            return { status: 400, message: 'Token inválido' }
        }

        try {
            await Dispositivo.update({situacao: situacao.ATIVO, dataHoraUltimaAtualizacao: new Date()}, {where: {id}});
            console.log('FIM', this.ATIVAR_DISPOSITIVO);
            return { status: 204 }
        } catch (error) {
            console.error(error.message);
            return {
                status: 500,
                message: error.message
            }
        }
    }
}

module.exports = DispositivoService;