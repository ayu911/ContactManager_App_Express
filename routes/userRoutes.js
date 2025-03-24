const express = require('express');
const { registerUser, loginUser, getCurrentUser } = require('../controllers/userController');
const validateToken = require('../middleware/validateTokenHandler'); // Middleware for authentication

const router = express.Router();

// Route for User Registration
router.post('/register', registerUser);

// Route for User Login
router.post('/login', loginUser);

// Route to Get Current User (Protected Route)
router.get('/current', validateToken, getCurrentUser);

module.exports = router;
