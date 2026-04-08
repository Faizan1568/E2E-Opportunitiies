const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const opportunityRoutes = require('./routes/opportunities');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/opportunities', opportunityRoutes);

// Database Connection
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Error: MONGODB_URI is not defined in .env file');
  process.exit(1);
}

mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 5000,
})
  .then(() => console.log('Successfully connected to MongoDB Atlas!'))
  .catch(err => {
    console.error('MongoDB Connection Error:', err.message);
  });

// --- ADD THIS PORTION ---
app.get('/status', (req, res) => {
  res.json({
    server: 'Running',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    env: {
      MONGODB_URI: process.env.MONGODB_URI ? 'Defined' : 'Found',
      JWT_SECRET: process.env.JWT_SECRET ? 'Defined' : 'Missing'
    }
  });
});
// ------------------------

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
