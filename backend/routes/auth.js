const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');

// Register
router.post('/signup', async (req, res) => {
  try {
    const { email, password, category, role } = req.body;
    
    // Safety check: force admin role for specific emails
    const isAdminEmail = email.toLowerCase() === 'admin@e2e.com';
    const finalRole = isAdminEmail ? 'admin' : role;
    const isRoleAdmin = finalRole === 'admin';

    // Select correct model
    const Model = isRoleAdmin ? Admin : User;

    // Check if user exists in ANY collection to avoid duplicate emails across roles
    let existingUser = await User.findOne({ email });
    let existingAdmin = await Admin.findOne({ email });
    
    if (existingUser || existingAdmin) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create new record
    const newUser = new Model({ 
      email: email.toLowerCase(), 
      password, 
      category: isRoleAdmin ? 'Administrator' : category,
      isAdmin: isRoleAdmin
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    await newUser.save();

    res.status(201).json({ success: true, message: 'Registration successful' });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const rawEmail = req.body.email || '';
    const email = rawEmail.toLowerCase();
    const { password } = req.body;
    let { role } = req.body;
    
    // Safety check: force admin role for specific emails
    const isAdminEmail = email === 'admin@e2e.com';
    if (isAdminEmail) {
      role = 'admin';
    }
    
    const isRoleAdmin = role === 'admin';

    // AUTO-MIGRATION LOGIC
    if (isAdminEmail) {
      const userInGeneralCollection = await User.findOne({ email });
      if (userInGeneralCollection) {
        console.log(`Auto-migrating Admin account: ${email}`);
        
        // Ensure they exist in Admin collection
        let adminRecord = await Admin.findOne({ email });
        if (!adminRecord) {
          adminRecord = new Admin({
            email: userInGeneralCollection.email,
            password: userInGeneralCollection.password,
            isAdmin: true,
            category: 'Administrator'
          });
          await adminRecord.save();
        }
        
        // Optional: Remove from User collection to prevent confusion
        await User.deleteOne({ email });
      }
    }

    // Select correct model
    const Model = isRoleAdmin ? Admin : User;

    // Check user in corresponding collection
    const user = await Model.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: 'Invalid credentials' });

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: 'Invalid credentials' });

    // Create token - FORCE isAdmin for the main admin email
    const finalIsAdmin = isAdminEmail ? true : user.isAdmin;

    const token = jwt.sign(
      { userId: user._id, isAdmin: finalIsAdmin },
      process.env.JWT_SECRET || 'secretkey',
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token,
      user: {
        email: user.email,
        isAdmin: finalIsAdmin,
        category: isAdminEmail ? 'Administrator' : (user.category || 'User')
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
