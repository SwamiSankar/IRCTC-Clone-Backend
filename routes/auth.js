const express = require('express');

const {
  createUser,
  login,
  getMe,
  logout,
  updateUser,
} = require('../controllers/auth');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.post('/register', createUser);
router.post('/login', login);
router.get('/me', protect, getMe);
router.get('/logout', logout);
router.put('/updatedetails', protect, updateUser);
module.exports = router;
