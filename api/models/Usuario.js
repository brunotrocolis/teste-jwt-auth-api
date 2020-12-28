const {Model, DataTypes} = require('sequelize');

class Usuario extends Model {
    static init(sequelize) {
        super.init({
            id: {
                field: 'ID_USUARIO',
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            nome: {
                field: 'NO_USUARIO',
                type: DataTypes.STRING
            },
            email: {
                field: 'CD_EMAIL',
                type: DataTypes.STRING
            },
            senha: {
                field: 'CD_SENHA',
                type: DataTypes.STRING
            },
            situacao: {
                field: 'EN_SITUACAO',
                type: DataTypes.STRING
            },
            tipo: {
                field: 'EN_TIPO',
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
            tableName: 'CAD_USUARIO'
        });
    }
    static associate (models) {
        this.hasMany(models.Dispositivo, {foreignKey: 'usuario'});
    }
};

module.exports = Usuario;
