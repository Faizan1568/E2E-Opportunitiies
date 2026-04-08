const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const Admin = require('./models/Admin');

async function seedAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB');

    const email = 'admin@e2e.com';
    const password = 'password123';

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await Admin.updateOne(
      { email },
      { 
        password: hashedPassword, 
        isAdmin: true, 
        category: 'Administrator' 
      },
      { upsert: true }
    );

    console.log('Admin user seeded: admin@e2e.com / password123');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedAdmin();
