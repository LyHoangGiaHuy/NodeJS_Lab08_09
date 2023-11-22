const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.SECRET;

function checkLogin(req, res, next) {
    const token = req.headers.authorization.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({success: false, message: "Unauthorized"});
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({success: false, message: "Token does not match"});
        }
        next();
    });
}
module.exports = checkLogin;