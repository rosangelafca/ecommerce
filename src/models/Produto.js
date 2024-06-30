const {DataTypes} = require('sequelize');
const conn = require('../database/conn');

const Produto = conn.define("produto", {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    titulo:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    preco:{
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    }
});

module.exports = Produto;