import React from 'react';
import { MapPin, CreditCard, Link as LinkIcon, Briefcase, GraduationCap } from 'lucide-react';

const OpportunityCard = ({ type, data }) => {
  const isInternship = type === 'internship';
  const isOffline = data.mode === 'Offline';
  const isLoan = data.mode === 'Loan';

  return (
    <div className="card">
      <div className="card-header">
        {data.image && (
          <div style={{ background: 'white', padding: '5px', borderRadius: '8px', marginBottom: '15px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', height: '50px', width: 'auto', minWidth: '100px' }}>
            <img 
              src={data.image} 
              alt="Logo" 
              style={{ maxHeight: '40px', maxWidth: '120px', objectFit: 'contain' }} 
              onError={(e) => e.target.style.display = 'none'} 
            />
          </div>
        )}
        <h3 style={{ fontSize: data.image ? '1.2rem' : '1.4rem' }}>{isInternship ? data.title : data.name}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.9)', fontWeight: '600', marginTop: '5px' }}>
          <GraduationCap size={16} /> {isInternship ? data.company : data.category}
        </div>
      </div>
      <div className="card-body">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {!isInternship ? (
            <>
              <div className="card-info"><CreditCard size={16} className="card-icon" /> <span className="card-label">Amount:</span> {data.amount}</div>
              <div className="card-info"><LinkIcon size={16} className="card-icon" /> <span className="card-label">Eligibility:</span> {data.eligibility}</div>
              <div className="card-info">
                <span className={`status-badge ${
                  data.status === 'Available' ? 'status-available' : 
                  data.status === 'Soon' ? 'status-soon' : 
                  'status-unavailable'
                }`}>
                  {(data.status || 'Available') === 'Soon' ? 'Coming Soon' : (data.status || 'Available')}
                </span>
              </div>
              {isOffline && (
                <div className="card-info" style={{ opacity: 0.8, fontSize: '0.85rem' }}>
                  <MapPin size={14} style={{ marginRight: '5px' }} /> {data.address}
                </div>
              )}
            </>
          ) : (
            <>
              <div className="card-info"><MapPin size={16} className="card-icon" /> <span className="card-label">Location:</span> {data.location}</div>
              <div className="card-info"><CreditCard size={16} className="card-icon" /> <span className="card-label">Stipend:</span> {data.stipend}</div>
              <div className="card-info"><Briefcase size={16} className="card-icon" /> <span className="card-label">Skills:</span> {data.skills}</div>
            </>
          )}
        </div>
        {(!isOffline || isLoan) ? (
          <a 
            href={data.applyLink} 
            target="_blank" 
            rel="noreferrer" 
            className={`btn ${isInternship ? 'btn-secondary' : 'btn-primary'}`} 
            style={{ display: 'block', textAlign: 'center', marginTop: '20px', width: '100%' }}
          >
            {isInternship ? 'Apply Now' : (isLoan ? 'Apply for Loan' : 'Apply for Scholarship')}
          </a>
        ) : (
          <div 
            className="btn btn-primary" 
            style={{ display: 'block', textAlign: 'center', marginTop: '20px', width: '100%', cursor: 'default' }}
          >
            Visit to Address
          </div>
        )}
      </div>
    </div>
  );
};

export default OpportunityCard;
