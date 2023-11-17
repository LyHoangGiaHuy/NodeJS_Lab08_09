const User = require('../models/UserSchema');

module.exports = {
    login: async function(req, res) {
        const { email, password } = req.body;
        console.log(email);
        res.end()
    }
}