const express = require('express');

const { createUser, login } = require('../controllers/auth');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.post('/register', createUser);
router.route('/login').post(login);

module.exports = router;
