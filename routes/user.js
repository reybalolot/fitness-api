const express = require('express');
const router = express.Router();
const { verifyUser } = require('../utils/auth');


//controllers
const userController = require('../controllers/user');

//routes
router.post('/register', userController.registerUser);
router.post('/login', verifyUser, userController.loginUser);

module.exports = router;
