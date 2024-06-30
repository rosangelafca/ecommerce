const {DataTypes} = require('sequelize');
const conn = require('../database/conn')
const Usuario = require('./Usuario')

const Pagamento = conn.define('pagamentos', {
    codigo:{
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
        validate:{
            notEmpty: true
        }
    },
    status:{
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    data_pagamento:{
        type: DataTypes.DATEONLY
    }
});

Usuario.hasOne(Pagamento);
Pagamento.belongsTo(Usuario);

module.exports = Pagamento;