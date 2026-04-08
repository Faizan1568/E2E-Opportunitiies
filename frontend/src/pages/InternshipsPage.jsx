import React from 'react';

const InternshipsPage = () => {
  return (
    <div className="container" style={{ padding: '80px 0', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <div className="glass" style={{ padding: '60px', maxWidth: '800px', width: '100%', backgroundColor: 'rgba(0, 77, 64, 0.05)', borderRadius: '24px', border: '2px dashed var(--primary-color)' }}>
        <h1 style={{ marginBottom: '20px', fontSize: '2.5rem' }}>Finding the Suitable Internships & Jobs</h1>
        <div style={{ width: '80px', height: '4px', background: 'var(--secondary-color)', margin: '0 auto 30px', borderRadius: '2px' }}></div>
        <p style={{ fontSize: '1.4rem', opacity: 0.8, fontWeight: '500', color: 'var(--primary-color)' }}>
          We will update this soon!
        </p>
        <p style={{ marginTop: '20px', fontSize: '1rem', opacity: 0.6 }}>
          Our team is working diligently to bring you the best career opportunities. Stay tuned!
        </p>
      </div>
    </div>
  );
};

export default InternshipsPage;
