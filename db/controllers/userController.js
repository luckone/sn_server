const mongoose = require('mongoose');
const user = require('../models/user');

module.exports = {
 createUser: () => {
     console.log('USER CREATED', user)
 }
}
