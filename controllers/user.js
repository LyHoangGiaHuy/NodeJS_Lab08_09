const User = require('../models/UserSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
require('dotenv').config();
const secretKey = process.env.SECRET;



async function findUser(email) {
    const user = await User.findOne({email: email});
    return user;
}

module.exports = {
    login: async function(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ success : false, message : errors.array()[0].msg });
        }

        const { email, password } = req.body;
        const user = await findUser(email);

        if (bcrypt.compareSync(password, user.password)) {
            const options = {
                expiresIn: '1h'
            };
            const token = jwt.sign({user: user.email}, secretKey, options);

            res.json({status: true, message: 'Login Success', token: token});
        } else {
            res.json({status: false, message: 'Invalid email or password'});
        }
    },
    register: async function(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ success : false, message : errors.array()[0].msg });
        }

        let { email, password } = req.body;
        const user = await findUser(email);

        if (!user) {
            password = bcrypt.hashSync(password, 10)
            const newUser = new User({ email: email, password: password});
            newUser.save();
            res.json({ success: true, message: 'Account successfully created'});
        } else {
            res.json({ success: false, message: 'Email already exists'});
        }
    }
}