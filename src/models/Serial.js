const {DataTypes} = require('sequelize');
const conn = require('../database/conn');

const Serial = conn.define('serial', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    chave:{
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
        validate:{
            notEmpty: true
        }
    }
})

module.exports = Serial;