const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const axios = require('axios'); // Using axios as it's common and likely available in backend node_modules
const Papa = require('papaparse');

dotenv.config({ path: path.join(__dirname, '../.env') });

const Opportunity = require('../models/Opportunity');

const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT52YDHf-OGVMFl1ZjPIY-b1CkfbczpythdhCNwyoIpMrWTzHiBGPaqPBgXAH2XQGO8kpmBJXuakoW4/pub?output=csv';

async function migrate() {
  try {
    console.log('--- Starting Data Migration ---');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB Atlas');

    // Clear existing data for a clean sync
    console.log('Clearing existing opportunities for a fresh sync...');
    await Opportunity.deleteMany({});

    // Fetch CSV
    console.log('Fetching data from Google Sheets...');
    const response = await axios.get(CSV_URL);
    const csvData = response.data;

    // Parse CSV
    Papa.parse(csvData, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const rows = results.data.filter(row => row.Name && row.Name.trim() !== '');
        console.log(`Found ${rows.length} rows to migrate.`);

        for (const row of rows) {
          try {
            // Normalize and Clean Data
            const cleanedMode = row.Mode ? row.Mode.trim() : 'Online';
            // Map to match frontend expectations
            let finalMode = cleanedMode;
            if (cleanedMode.toLowerCase() === 'online') finalMode = 'Online';
            else if (cleanedMode.toLowerCase() === 'offline') finalMode = 'Offline';
            else if (cleanedMode.toLowerCase() === 'loan') finalMode = 'Loan';
            else if (cleanedMode.toLowerCase() === 'bank') finalMode = 'bank';
            else if (cleanedMode.toLowerCase() === 'state') finalMode = 'state';

            const opportunity = new Opportunity({
              name: row.Name || 'Unnamed',
              applyLink: row.Website || '#',
              eligibility: row.Eligibility || '',
              category: row.Stream || 'All',
              mode: finalMode,
              amount: row.Amount || 'Check Website',
              address: row.Address || '',
              image: row.Image || '',
              status: row.Status || 'Available'
            });

            await opportunity.save();
            console.log(`Migrated: ${opportunity.name}`);
          } catch (err) {
            console.error(`Error migrating row: ${JSON.stringify(row)}`);
            console.error(err.message);
            // Continue with next row
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
