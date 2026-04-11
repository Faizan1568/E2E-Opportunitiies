const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Opportunity = require('./models/Opportunity');

dotenv.config({ path: path.join(__dirname, '.env') });

async function testFind() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected');
    
    const offline = await Opportunity.findOne({ mode: 'Offline' });
    console.log('Offline sample:', offline ? { name: offline.name, city: offline.city } : 'None');
    
    const countWithIncome = await Opportunity.countDocuments({ incomeLimit: { $ne: null } });
    console.log('Opportunities with income limit:', countWithIncome);
    
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

testFind();
