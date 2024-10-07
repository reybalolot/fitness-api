const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports.createAccessToken = (user) => {
    try {
        const data = {
            id: user._id,
            email: user.email,
            isAdmin: user.isAdmin
        };
        return jwt.sign(data, process.env.JWT_SECRET_KEY, {});
    } catch (error) {
        res.status(500).json({
            error: 'Token Creation Failed',
            message: error.message
        });
    }
}

module.exports.verifyUser = (req, res, next) => {
    try {
        const userToken = req.headers.authorization;

        if (typeof userToken === 'undefined') {
            return res.status(401).send({ auth: 'Failed. No Token' });
        } else {
            const encryptedToken = userToken.slice(7, userToken.length);

            jwt.verify(encryptedToken, process.env.JWT_SECRET_KEY, (error, decodedToken) => {
                if (error) {
                    return res.status(403).send({
                        error: 'Unauthorized',
                        message: error.message
                    });
                } else {
                    req.user = decodedToken;
                    next();
                }
            });
        }
    } catch (error) {
        res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        });
    }
}
