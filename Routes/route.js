const express = require('express');

const login = require('../Controllers/login');
const signup = require('../Controllers/signup');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

module.exports = router;