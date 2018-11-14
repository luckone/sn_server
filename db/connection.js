const Sequelize = require('sequelize');
const mongoose = require('mongoose');
const CONFIG = require('../config');

module.exports = {
    mongoConnection: () => {
        mongoose.connect(`mongodb://${CONFIG.MONGO.HOST}:${CONFIG.MONGO.PORT}/${CONFIG.MONGO.USER}`, {
            useNewUrlParser: true
        })
        .then(() => {
            console.log('MongoDB connection established')
        })
        .catch(ex => console.log(ex.message))
    }
};
