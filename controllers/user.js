const User = require('../models/UserSchema');
const jwt = require('jsonwebtoken');

module.exports = {
    login: async function(req, res) {
        const { email, password } = req.body;
        console.log(email);
    }
}