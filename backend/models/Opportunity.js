const mongoose = require('mongoose');

const opportunitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  applyLink: {
    type: String,
    required: true
  },
  eligibility: {
    type: String
  },
  category: {
    type: String
  },
  mode: {
    type: String,
    required: true
  },
  amount: {
    type: String
  },
  address: {
    type: String
  },
  image: {
    type: String
  },
  status: {
    type: String,
    default: 'Available',
    enum: ['Available', 'Soon', 'Coming Soon', 'Not Available']
  },
  deadline: {
    type: String
  },
  company: {
    type: String // For internships
  },
  location: {
    type: String // For internships
  },
  stipend: {
    type: String // For internships
  },
  skills: {
    type: String // For internships
  }
}, { timestamps: true });

module.exports = mongoose.model('Opportunity', opportunitySchema);
