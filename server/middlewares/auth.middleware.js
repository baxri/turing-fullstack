const jwt = require('jsonwebtoken');
const config = require('../config/config');
const db = require('../config/db.config');
const User = db.user;

module.exports = (req, res, next) => {

    let token = req.headers.authorization;

    if (!token) {
        res.status(401).send({
            message: 'Access denied!'
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            res.status(401).send({
                message: 'Access denied! Invalid Token!'
            });
        }

        req.user_id = decoded.id;
        next();
    });
}