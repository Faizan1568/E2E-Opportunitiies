const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const axios = require('axios'); // Using axios as it's common and likely available in backend node_modules
const Papa = require('papaparse');

dotenv.config({ path: path.join(__dirname, '../.env') });

const Opportunity = require('../models/Opportunity');

const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSVDN8PoViLs6oePq4UtcyrPLTghFV1j8adx2lc3iTPmHtQnglE8oHNobAmDjE8gg/pub?output=csv';

const extractCity = (address) => {
  if (!address) return '';
  const cities = ['Mumbai', 'Navi Mumbai', 'Pune', 'Thane', 'Nagpur', 'Delhi', 'Bangalore', 'Karnataka', 'Gujarat', 'Rajasthan', 'Bihar'];
  for (const city of cities) {
    if (address.toLowerCase().includes(city.toLowerCase())) return city;
  }
  // Try to find common pattern "City-XXXXXX"
  const match = address.match(/([a-zA-Z\s]+)-\d{6}/);
  if (match) return match[1].split(',').pop().trim();
  
  return '';
};

const extractIncome = (eligibility) => {
  if (!eligibility) return null;
  const text = eligibility.toLowerCase();
  
  // Look for patterns like "1.5L", "2 Lakh", "250000", "Rs 6L"
  const lakhMatch = text.match(/([\d\.]+)\s*(?:lakh|l)/);
  if (lakhMatch) return parseFloat(lakhMatch[1]) * 100000;
  
  const rawMatch = text.match(/[\d,]{4,}/);
  if (rawMatch) return parseInt(rawMatch[0].replace(/,/g, ''));
  
  return null;
};

async function migrate() {
  try {
    console.log('--- Starting Data Migration ---');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB Atlas');

    console.log('Clearing existing opportunities for a fresh sync...');
    await Opportunity.deleteMany({});

    console.log('Fetching data from Google Sheets...');
    const response = await axios.get(CSV_URL);
    const csvData = response.data;

    Papa.parse(csvData, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const rows = results.data.filter(row => row.Name && row.Name.trim() !== '');
        console.log(`Found ${rows.length} rows to migrate.`);

        for (const row of rows) {
          try {
            const rawMode = row.Mode ? row.Mode.trim().toLowerCase() : 'online';
            let finalMode = 'online';
            
            if (rawMode.includes('offline')) finalMode = 'Offline';
            else if (rawMode === 'bank') finalMode = 'bank';
            else if (rawMode === 'state') finalMode = 'state';
            else if (rawMode === 'loan') finalMode = 'Loan';
            else finalMode = 'Online';

            const opportunity = new Opportunity({
              name: row.Name || 'Unnamed',
              applyLink: row.ApplyLink || row.Website || '#',
              eligibility: row.Eligibility || '',
              category: row.Stream || 'All',
              mode: finalMode,
              amount: row.Amount || 'Check Website',
              address: row.Address || '',
              image: row.Image || '',
              status: (row.Status || 'Available').toLowerCase().includes('soon') ? 'Soon' : 'Available',
              city: extractCity(row.Address),
              incomeLimit: extractIncome(row.Eligibility)
            });

            await opportunity.save();
            // Optional: console.log(`Migrated: ${opportunity.name}`);
          } catch (err) {
            console.error(`Error migrating row: ${row.Name}`);
            console.error(err.message);
          }
        }

        console.log('--- Migration Completed Successfully! ---');
        process.exit(0);
      },
      error: (error) => {
        console.error('Parsing error:', error);
        process.exit(1);
      }
    });

  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

migrate();
