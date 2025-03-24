const express = require('express');
const router = express.Router();
const { getContact, getContactById, createContact, updateContact, deleteContact } = require('../controllers/contactController');

// GET all contacts
router.route('/').get(getContact);

// GET contact by ID
router.route('/:id').get(getContactById);

// CREATE a new contact
router.route('/').post(createContact);

// UPDATE a contact by ID
router.route('/:id').put(updateContact);

// DELETE a contact by ID
router.route('/:id').delete(deleteContact);

module.exports = router;
