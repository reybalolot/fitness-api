const User = require('../models/user');
const bcrypt = require('bcrypt');
const { createAccessToken } = require('../utils/auth');

module.exports.registerUser = (req, res) => {
    try {
        const { email, password } = req.body;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).send({ error: 'Invalid Email' });
        }
        if (password.length < 8) {
            return res.status(400).send({ error: 'Password must be at least 8 characters' });
        }

        User.find({ email: email })
        .then(user => {
            if (user.length !== 0) {
                return res.status(200).send({ message: 'Email already exists' });
            }
            const newUser = new User({
                email: email,
                password: bcrypt.hashSync(password, 10),
            });

            return newUser.save()
            .then(() => {
                res.status(201).send({ message: 'Registered Successfully' });
            })
            .catch(error =>
                res.status(500).send({
                    message: 'Error in save',
                    error: error.message
                })
            )
        })
        .catch(error =>
            res.status(500).send({
                message: 'Error in save',
                error: error.message
            })
        );

    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
}

module.exports.loginUser = (req, res) => {
    try {
        const { email, password } = req.body;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid Email' });
        }

        User.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.status(404).send({ error: 'No Email Found' });
            } else if (!bcrypt.compareSync(password, user.password)) {
                return res.status(401).send({ error: 'Email and password do not match' });
            } else {
                res.status(200).send({
                    token: createAccessToken(user)
                });
            }
        })
        .catch(error =>
            res.status(500).send({
                message: 'Error Logging in',
                error: error.message
            })
        );
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
}
