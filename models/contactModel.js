const mongoose = require('mongoose');

const contactSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter the contact name'],
        },
        email: {
            type: String,
            required: [true, 'Please enter the email'],
            unique: true,
            match: [
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                'Please enter a valid email address',
            ],
        },
        phone: {
            type: String,
            required: [true, 'Please enter the phone number'],
        },
    },
    {
        timestamps: true, // Automatically add createdAt and updatedAt fields
    }
);

module.exports = mongoose.model('Contact', contactSchema);
