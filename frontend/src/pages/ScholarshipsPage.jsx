import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import OpportunityCard from '../components/OpportunityCard';

const ScholarshipsPage = ({ mode, title, description }) => {
  const { scholarships } = useData();
  const [statusFilter, setStatusFilter] = useState('Available');

  // Strict filtering by mode and status
  let filtered = scholarships.filter(s => 
    s.mode === mode && 
    (s.status || 'Available').toLowerCase() === (statusFilter === 'Coming Soon' ? 'soon' : statusFilter).toLowerCase()
  );
  
  // Requirement: Don't show offline cards without address
  if (mode?.toLowerCase() === 'offline') {
    filtered = filtered.filter(s => s.address && s.address.trim() !== '');
  }

  const filterOptions = ['Available', 'Coming Soon'];

  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1>{title}</h1>
        <p style={{ opacity: 0.7 }}>{description}</p>
      </div>

      <div className="filter-tabs">
        {filterOptions.map(option => (
          <div 
            key={option}
            className={`filter-tab ${statusFilter === option ? 'active' : ''}`}
            onClick={() => setStatusFilter(option)}
          >
            {option}
          </div>
        ))}
      </div>

      <div className="card-grid">
        {filtered.length > 0 ? (
          filtered.map(s => <OpportunityCard key={s.id} data={s} />)
        ) : (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px 40px', background: 'rgba(255,255,255,0.03)', borderRadius: '20px', border: '2px dashed var(--card-border)' }}>
            <p style={{ fontSize: '1.2rem', color: '#999', margin: 0 }}>No {statusFilter.toLowerCase()} {title.toLowerCase()} found at the moment.</p>
            <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '10px' }}>Please check back later or explore other sections.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScholarshipsPage;
