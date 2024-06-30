const {DataTypes} = require('sequelize');
const conn = require('../database/conn');
const Serial = require('./Serial');

const Usuario = conn.define('usuario', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    nome:{
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
        validate:{
            notEmpty: true
        }
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
        unique: true,
        validate:{
            isEmail: true
        }
    },
    hash_passwd:{
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
        validate:{
            notEmpty: true
        }
    },
    ip_user:{
        type: DataTypes.STRING,
        allowNull: true
    }


});

Usuario.hasOne(Serial, {
    foreignKey:{
        name: "id_usuario"
    }
});

Serial.belongsTo(Usuario, {
    foreignKey:{name: "id_usuario"}
})


module.exports = Usuario;