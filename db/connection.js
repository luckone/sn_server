const Sequelize = require('sequelize');
const CONFIG = require('../config');

module.exports = {
    mySqlConnection: new Sequelize(CONFIG.MYSQL.DATABASE, CONFIG.MYSQL.USER, CONFIG.MYSQL.PASSWORD, {
        dialect: 'mysql',
        host: CONFIG.MYSQL.HOST
    })
};