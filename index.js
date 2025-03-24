const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/dbConnection'); 
const dotenv = require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

const port = process.env.PORT || 5001;

// Middleware for parsing JSON data
app.use(express.json());

// API Routes
app.use('/api/contacts', require('./routes/contactRoutes'));

// Error handling middleware (should be after routes)
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on PORT ${port}`);
});
