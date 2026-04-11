import React from 'react';
import { ShieldCheck, Rocket, Landmark, Users } from 'lucide-react';

const VisionPage = () => {
  return (
    <div className="vision-page" style={{ padding: '60px 0' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '20px', background: 'linear-gradient(to right, var(--primary-color), var(--secondary-color))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Vision & Future Planning
          </h1>
          <p style={{ fontSize: '1.25rem', opacity: 0.8, maxWidth: '700px', margin: '0 auto' }}>
            We are building the world's most robust ecosystem connecting education seekers with industry leaders.
          </p>
        </div>

        {/* Section 1: NGOs & Trust */}
        <div className="glass" style={{ marginBottom: '60px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '40px', flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
              <div style={{ background: 'var(--primary-color)', color: 'white', padding: '10px', borderRadius: '12px' }}>
                <Landmark size={28} />
              </div>
              <h2 style={{ margin: 0, fontSize: '2rem' }}>NGO & Trust Partnerships</h2>
            </div>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '20px' }}>
              In the coming phases, we are establishing a **Centralized Partnership Network** with regional NGOs and Global Trusts. 
              This tie-up will allow students on the E2E platform to access **Direct Scholarships** without any middleman, 
              ensuring that funds reach exactly where they are needed most.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <ShieldCheck className="card-icon" size={20} />
                <span>Verified Trust Verification</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <ShieldCheck className="card-icon" size={20} />
                <span>Direct Disbursement Portal</span>
              </div>
            </div>
          </div>
          <div style={{ height: '350px', width: '100%' }}>
            <img 
              src="/images/ngo_trust_vision.png" 
              alt="NGO Partnerships" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>
        </div>

        {/* Section 2: Startup Ecosystem */}
        <div className="glass" style={{ marginBottom: '60px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ height: '350px', width: '100%' }}>
            <img 
              src="/images/startup_collaboration_vision.png" 
              alt="Startup Recruitment" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>
          <div style={{ padding: '40px', flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
              <div style={{ background: 'var(--secondary-color)', color: 'white', padding: '10px', borderRadius: '12px' }}>
                <Rocket size={28} />
              </div>
              <h2 style={{ margin: 0, fontSize: '2rem' }}>New Startup Placement Hub</h2>
            </div>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '20px' }}>
              The future of employment is agile. We are connecting with **Fast-Growth Startup Companies** to create a direct 
              recruitment pipeline. Students who excel on our E2E platform will be prioritized for hiring by our partner startups, 
              turning your scholarship into a career launchpad.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <Users className="card-icon" size={20} />
                <span>Direct Hiring Pipelines</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <Users className="card-icon" size={20} />
                <span>Startup Mentorship</span>
              </div>
            </div>
          </div>
        </div>

        {/* Future Strength Section */}
        <div className="glass" style={{ padding: '50px', textAlign: 'center', background: 'var(--header-bg)', color: 'white' }}>
          <h2 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '20px' }}>Becoming Stronger Together</h2>
          <p style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '30px' }}>
            By unifying NGOs, Trusts, and the Startup ecosystem into one centralized platform, 
            E2E Opportunities will become the strongest bridge between learning and earning in the future.
          </p>
          <button className="btn btn-secondary" style={{ fontSize: '1.1rem', padding: '12px 40px' }}>
            Join the Journey
          </button>
        </div>

      </div>
    </div>
  );
};

export default VisionPage;
