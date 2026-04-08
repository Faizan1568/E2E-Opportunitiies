const express = require('express');
const router = express.Router();
const Opportunity = require('../models/Opportunity');

// Get all opportunities
router.get('/', async (req, res) => {
  try {
    const opportunities = await Opportunity.find().sort({ createdAt: -1 });
    res.json(opportunities);
  } catch (err) {
    console.error('Fetch opportunities error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new opportunity
router.post('/', async (req, res) => {
  try {
    // Basic mapping check to handle different field names if necessary
    const newOpportunity = new Opportunity(req.body);
    await newOpportunity.save();
    res.status(201).json({ success: true, data: newOpportunity });
  } catch (err) {
    console.error('Add opportunity error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
