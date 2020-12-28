const {Model, DataTypes} = require('sequelize');

class Dispositivo extends Model {
    static init(sequelize) {
        super.init({
            id: {
                field: 'ID_DISPOSITIVO',
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            usuario: {
                field: 'ID_USUARIO',
                type: DataTypes.BIGINT
            },
            nome: {
                field: 'NO_DISPOSITIVO',
                type: DataTypes.STRING
            },
            situacao: {
                field: 'EN_SITUACAO',
                type: DataTypes.STRING
            },
            dataHoraCadastro: {
                field: 'DH_CADASTRO',
                type: DataTypes.DATE
            },
            dataHoraUltimaatualizacao: {
                field: 'DH_ULTIMA_ATUALIZACAO',
                type: DataTypes.DATE
            }

        }, {
            sequelize,
            tableName: 'CAD_DISPOSITIVO'
        });
    }

    static associate (models) {
        this.belongsTo(models.Usuario, { foreignKey: 'usuario' });
    }
}

module.exports = Dispositivo;