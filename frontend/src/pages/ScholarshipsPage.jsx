import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import OpportunityCard from '../components/OpportunityCard';

const ScholarshipsPage = ({ mode, title, description }) => {
  const { scholarships } = useData();
  const [statusFilter, setStatusFilter] = useState('Available');
  const [cityFilter, setCityFilter] = useState('ALL');
  const [stateFilter, setStateFilter] = useState('ALL');
  const [streamFilter, setStreamFilter] = useState('All');

  // Derive unique cities, states, and streams for the dropdowns
  const availableCities = ['ALL', 'Mumbai', 'Navi Mumbai', 'Delhi', 'Pune', 'Nagpur'];
  
  // Dynamic list of states based on data
  const availableStates = ['ALL', ...new Set(
    scholarships
      .filter(s => s.mode === 'state' && s.state && s.state.trim() !== '')
      .map(s => s.state)
  )].sort();

  // Mapping for dynamic "All" labels
  const getAllLabel = () => {
    switch (mode) {
      case 'Online': return 'All Online Scholarships';
      case 'Offline': return 'All Offline Scholarships';
      case 'bank': return 'All Banking Scholarships';
      case 'state': return 'All State Scholarships';
      case 'Loan': return 'All Loan Schemes';
      default: return 'All Scholarships';
    }
  };
  
  // Clean up streams: Remove empty, "-", "All", and "All Streams" from data to avoid duplicates with our default option
  const availableStreams = [...new Set(
    scholarships
      .filter(s => s.mode === mode && s.category && s.category.trim() !== '' && s.category !== '-' && !s.category.toLowerCase().includes('all'))
      .map(s => s.category.trim())
  )].sort();

  // Unified Filtering Logic
  let filtered = scholarships.filter(s => {
    // 1. Basic Mode Filter
    if (s.mode !== mode) return false;

    // 2. Status Filter
    const targetStatus = statusFilter === 'Coming Soon' ? 'soon' : 'available';
    if ((s.status || 'available').toLowerCase() !== targetStatus) return false;

    // 3. City Filter (Only for Offline)
    if (mode === 'Offline') {
      if (cityFilter !== 'ALL') {
        if (s.city !== cityFilter) return false;
      }
    }

    // 4. State Filter (Only for State Scholarships)
    if (mode === 'state') {
      if (stateFilter !== 'ALL') {
        if (s.state !== stateFilter) return false;
      }
    }

    if (streamFilter !== 'All') {
      if (s.category !== streamFilter) return false;
    }

    return true;
  });
  
  // Requirement: Don't show offline cards without address
  if (mode?.toLowerCase() === 'offline') {
    filtered = filtered.filter(s => s.address && s.address.trim() !== '');
  }

  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{title}</h1>
        <p style={{ opacity: 0.7, fontSize: '1.1rem' }}>{description}</p>
      </div>

      <div className="filter-tabs" style={{ marginBottom: '20px' }}>
        {['Available', 'Coming Soon'].map(option => (
          <div 
            key={option}
            className={`filter-tab ${statusFilter === option ? 'active' : ''}`}
            onClick={() => setStatusFilter(option)}
          >
            {option}
          </div>
        ))}
      </div>

      {/* Modern Filter Bar */}
      <div className="filter-bar" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {mode === 'Offline' ? (
          <div className="filter-group" style={{ maxWidth: '600px', flex: 1 }}>
            <label className="filter-label">Select City</label>
            <select 
              className="modern-select"
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
            >
              {availableCities.map(city => <option key={city} value={city}>{city}</option>)}
            </select>
          </div>
        ) : (
          <>
            {mode === 'state' && (
              <div className="filter-group" style={{ maxWidth: '400px', flex: 1 }}>
                <label className="filter-label">Select State</label>
                <select 
                  className="modern-select"
                  value={stateFilter}
                  onChange={(e) => setStateFilter(e.target.value)}
                >
                  {availableStates.map(st => <option key={st} value={st}>{st}</option>)}
                </select>
              </div>
            )}

            <div className="filter-group" style={{ maxWidth: '400px', flex: 1 }}>
              <label className="filter-label">Stream / Category</label>
              <select 
                className="modern-select"
                value={streamFilter}
                onChange={(e) => setStreamFilter(e.target.value)}
              >
                <option value="All">{getAllLabel()}</option>
                {availableStreams.map(stream => <option key={stream} value={stream}>{stream}</option>)}
              </select>
            </div>
          </>
        )}
      </div>

      <div className="card-grid">
        {filtered.length > 0 ? (
          filtered.map((s, idx) => <OpportunityCard key={s._id || idx} data={s} />)
        ) : (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px 40px', background: 'rgba(255,255,255,0.03)', borderRadius: '20px', border: '2px dashed rgba(255,255,255,0.1)' }}>
            <p style={{ fontSize: '1.2rem', color: '#999', margin: 0 }}>No opportunities match your selected filters.</p>
            <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '10px' }}>Try adjusting your stream or location selection.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScholarshipsPage;
