const {Sequelize} = require('sequelize');
const conn = new Sequelize({
    database: process.env.DB_NAME,
    username:process.env.DB_USER,
    password:process.env.DB_PASSWD,
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    dialect: 'postgres',
    timezone: '-03:00',
    dialectModule: require('pg'),
    pool:{
        min: 1,
        max: 10
    }
});

module.exports = conn;