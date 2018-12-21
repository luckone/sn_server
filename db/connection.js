const mongoose = require('mongoose');
const CONFIG = require('../config');

module.exports = {
    mongoConnection: () => {
        mongoose.connect(`mongodb://${CONFIG.MONGO.USER}:${CONFIG.MONGO.PASSWORD}@${CONFIG.MONGO.HOST}:${CONFIG.MONGO.PORT}/${CONFIG.MONGO.DATABASE}`, {
            useNewUrlParser: true
        })
        .then(() => {
            console.log('MongoDB connection established')
        })
        .catch(ex => console.log(ex.message))
    }
};
