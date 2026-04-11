import React, { createContext, useContext, useState, useEffect } from 'react';
import Papa from 'papaparse';
import { extractCity, extractState } from '../utils/dataParser';

const DataContext = createContext();

const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT52YDHf-OGVMFl1ZjPIY-b1CkfbczpythdhCNwyoIpMrWTzHiBGPaqPBgXAH2XQGO8kpmBJXuakoW4/pub?output=csv';
const API_URL = 'http://localhost:5000/api/opportunities';

export const DataProvider = ({ children }) => {
  const [scholarships, setScholarships] = useState([]);
  const [internships, setInternships] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Live Fetching from Google Sheets & MongoDB
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch from MongoDB
        let dbData = [];
        try {
          const response = await fetch(API_URL);
          if (response.ok) {
            dbData = await response.json();
          }
        } catch (dbErr) {
          console.error('DB Fetch error:', dbErr);
        }

        // 2. Fetch from Google Sheets
        Papa.parse(CSV_URL, {
          download: true,
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const mappedSheetData = results.data
              .filter(row => row.Name && row.Name.trim() !== '') // Filter empty rows
              .map((row, index) => ({
                id: `sheet-${index}`,
                name: row.Name || '',
                applyLink: row.Website || '#',
                eligibility: row.Eligibility || '',
                category: row.Stream || 'All',
                mode: row.Mode ? row.Mode.toLowerCase().trim() : 'online',
                amount: row.Amount || 'Check Website',
                address: row.Address || '',
                image: row.Image || '',
                status: row.Status || 'Available',
                city: extractCity(row.Address || ''),
                state: extractState(row.Eligibility || '')
              }));
            
            // Re-map common modes to capitalized format
            const finalizedSheetData = mappedSheetData.map(item => ({
              ...item,
              mode: item.mode === 'online' ? 'Online' : 
                    item.mode === 'offline' ? 'Offline' : 
                    item.mode === 'loan' ? 'Loan' : 
                    item.mode === 'bank' ? 'bank' : 
                    item.mode === 'state' ? 'state' : item.mode
            }));

            // Merge DB data and Sheet data
            // Use name as unique identifier to avoid duplicates across sources
            setScholarships(() => {
              const existingNames = new Set(finalizedSheetData.map(s => s.name.toLowerCase()));
              const filteredDbData = dbData.filter(d => !existingNames.has(d.name.toLowerCase()));
              return [...finalizedSheetData, ...filteredDbData];
            });
            
            setIsLoading(false);
          },
          error: (error) => {
            console.error('CSV Parsing error:', error);
            setScholarships(dbData); // Fallback to DB data only
            setIsLoading(false);
          }
        });
      } catch (error) {
        console.error('Fetch error:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const addScholarship = async (data) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      if (result.success) {
        setScholarships(prev => [result.data, ...prev]);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Add error:', err);
      // Fallback to local if no backend
      setScholarships(prev => [{ ...data, id: Date.now() }, ...prev]);
      return true;
    }
  };

  const addInternship = (data) => {
    setInternships(prev => [...prev, { ...data, id: Date.now() }]);
  };

  const addLoan = (data) => {
    addScholarship({ ...data, mode: 'Loan' });
  };

  return (
    <DataContext.Provider value={{ scholarships, internships, isLoading, addScholarship, addInternship, addLoan }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
