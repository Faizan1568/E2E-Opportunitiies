import React, { useState, useEffect } from 'react';
import HeroSlider from '../components/HeroSlider';
import { useData } from '../context/DataContext';
import OpportunityCard from '../components/OpportunityCard';
import WhatsAppWidget from '../components/WhatsAppWidget';

const Counter = ({ target, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(target);
    if (start === end) return;

    let totalMilisecondsStep = duration / end;
    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, totalMilisecondsStep);

    return () => clearInterval(timer);
  }, [target, duration]);

  return <span>{count}</span>;
};

const Home = () => {
  const { scholarships, internships } = useData();

  const stats = [
    { label: 'Offline Scholarships', count: scholarships.filter(s => s.mode === 'Offline').length || 200, icon: '🏛️' },
    { label: 'Online Scholarships', count: scholarships.filter(s => s.mode === 'Online').length || 300, icon: '🌐' },
    { label: 'State Scholarships', count: scholarships.filter(s => s.mode === 'state').length || 150, icon: '🗺️' },
    { label: 'Banking Scholarships', count: scholarships.filter(s => s.mode === 'bank').length || 50, icon: '🏦' },
    { label: 'Interest Free Loans', count: scholarships.filter(s => s.mode === 'Loan').length || 20, icon: '🤝' },
  ];

  const sections = [
    {
      title: 'Online Scholarship',
      text: 'Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle. Online scholarships provide a powerful gateway to global education right at your fingertips, allowing students to access opportunities from top universities and organizations worldwide without geographical limitations. With just an internet connection, you can explore various programs, apply easily, and move closer to achieving your academic and career goals. These scholarships reduce financial stress while offering flexible learning opportunities, helping you grow both personally and professionally.',
      image: '/hero1.png',
      reverse: false
    },
    {
      title: 'Offline Scholarship',
      text: 'The future belongs to those who believe in the beauty of their dreams. Offline scholarships support students at the local and national levels by offering financial assistance through schools, colleges, government bodies, and private organizations. These scholarships help bridge the gap between where you are and where you want to be by making education more accessible and affordable. They often come with added benefits like mentorship, recognition, and community support, which can boost your confidence and career journey while keeping you connected to your roots.',
      image: '/hero2.png',
      reverse: true
    },
    {
      title: 'International Scholarship & Internships',
      text: 'Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. International scholarships and internships provide an incredible opportunity to gain global exposure and experience different cultures. These programs allow students to study or work abroad, collaborate with international peers, and learn from world-class institutions and companies. They not only enhance academic knowledge but also build essential skills like adaptability, communication, and problem-solving, helping you succeed in a globally connected world.',
      image: '/hero3.png',
      reverse: false
    }
  ];

  return (
    <div className="home-page">
      <HeroSlider />

      <div className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stats-card">
                <div className="stats-icon">{stat.icon}</div>
                <div className="stats-number"><Counter target={stat.count} />+</div>
                <div className="stats-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '60px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>E2E Opportunities</h1>
          <p style={{ fontSize: '1.2rem', color: '#666', fontStyle: 'italic' }}>"From Learning to Earning"</p>
        </div>

        {sections.map((section, index) => (
          <div key={index} style={{
            display: 'flex',
            flexDirection: section.reverse ? 'row-reverse' : 'row',
            alignItems: 'center',
            gap: '40px',
            marginBottom: '80px',
            flexWrap: 'wrap'
          }}>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <img src={section.image} alt={section.title} style={{ width: '100%', borderRadius: '15px', boxShadow: 'var(--card-shadow)' }} />
            </div>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>{section.title}</h2>
              <p style={{
                fontSize: '1.2rem',
                color: '#444',
                lineHeight: '1.8',
                fontFamily: '"Outfit", sans-serif',
                fontWeight: '400'
              }}>{section.text}</p>
            </div>
          </div>
        ))}

        <div style={{ textAlign: 'center', padding: '60px 0', borderTop: '1px solid var(--card-border)' }}>
          <h2 style={{ marginBottom: '40px' }}>Featured Opportunities</h2>
          <div className="card-grid">
            {scholarships.slice(0, 3).map(s => <OpportunityCard key={s.id} type="scholarship" data={s} />)}
          </div>
        </div>
      </div>
      <WhatsAppWidget />
    </div>
  );
};

export default Home;
