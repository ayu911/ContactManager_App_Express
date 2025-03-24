const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/dbConnection');
const errorHandler = require('./middleware/errorHandler');

// Connect to MongoDB
connectDB();

const app = express();
const port = process.env.PORT || 5001;

// Middleware for parsing JSON
app.use(express.json());

// Routes
app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(port, () => {
    console.log(`🚀 Server running on PORT ${port}`);
});
