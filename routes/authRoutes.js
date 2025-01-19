const express = require('express');
const { register, login, getProfile } = require('../controllers/authController');
const { authenticateJWT } = require('../middlewares/authMiddleware'); 
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authenticateJWT, getProfile);

module.exports = router;
