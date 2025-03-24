const jwt = require('jsonwebtoken'); // Importing JWT library to handle token verification
const asyncHandler = require('express-async-handler'); // Middleware to handle async errors
const User = require('../models/userModel'); // Importing the User model to fetch user details from DB

// Middleware to validate JWT token for protected routes
const validateTokenHandler = asyncHandler(async (req, res, next) => {
    let token;

    // Checking if the request has an Authorization header and if it starts with 'Bearer'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extracting the token from the Authorization header
            token = req.headers.authorization.split(' ')[1];

            // Verifying the token using JWT secret
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Fetching the user details from the database (excluding the password)
            req.user = await User.findById(decoded.id).select('-password');

            // Proceed to the next middleware/controller function
            next();
        } catch (error) {
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }

    // If no token is found, return an error
    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

module.exports = validateTokenHandler;
