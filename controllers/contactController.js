const asyncHandler = require('express-async-handler'); // Middleware for handling async errors
const Contact = require('../models/contactModel'); // Import the Contact model

// @desc    Get all contacts
// @route   GET /api/contacts
// @access  Public
const getContact = asyncHandler(async (req, res) => {
    const contacts = await Contact.find(); // Fetch all contacts from the database
    res.status(200).json(contacts);
});

// @desc    Get a single contact by ID
// @route   GET /api/contacts/:id
// @access  Public
const getContactById = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id); // Find contact by ID
    if (!contact) {
        res.status(404);
        throw new Error('Contact not found'); // Return an error if contact does not exist
    }
    res.status(200).json(contact);
}); 

// @desc    Create a new contact
// @route   POST /api/contacts
// @access  Public
const createContact = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;

    // Validate input fields
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error('All fields are required');
    }

    // Check if the contact email already exists
    const contactExists = await Contact.findOne({ email });
    if (contactExists) {
        res.status(400);
        throw new Error('Contact with this email already exists');
    }

    // Create a new contact in the database
    const contact = await Contact.create({
        name,
        email,
        phone,
    });

    res.status(201).json(contact); // Return the newly created contact
});

// @desc    Update an existing contact
// @route   PUT /api/contacts/:id
// @access  Public
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error('Contact not found');
    }

    // Update contact details
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true } // Return the updated document
    );

    res.status(200).json(updatedContact);
});

// @desc    Delete a contact
// @route   DELETE /api/contacts/:id
// @access  Public
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error('Contact not found');
    }

    await contact.deleteOne(); // Remove the contact from the database
    res.status(200).json({ message: `Deleted contact with ID: ${req.params.id}` });
});

// Export all the functions
module.exports = { getContact, getContactById, createContact, updateContact, deleteContact };
