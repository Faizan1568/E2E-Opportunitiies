import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-section">
          <h2 className="footer-title">E2E Opportunities</h2>
          <p className="footer-text">
            Empowering students from learning to earning. Your one-stop destination for scholarships, loans, and internships.
          </p>
        </div>
        
        <div className="footer-section">
          <h3 className="footer-subtitle">Quick Links</h3>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/online-scholarships">Online Scholarships</a></li>
            <li><a href="/banking-scholarships">Banking Scholarships</a></li>
            <li><a href="/state-scholarships">State Scholarships</a></li>
            <li><a href="/internships">Internships & Jobs</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-subtitle">Contact Us</h3>
          <p className="footer-text">Email: support@e2e.com</p>
          <p className="footer-text">Phone: +91 123 456 7890</p>
        </div>
      </div>
      <div className="footer-bottom">
        © 2026 E2E Opportunities – Education to Employment. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
