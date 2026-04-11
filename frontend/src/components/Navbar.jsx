import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { User, Settings, Sun, Moon, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const NavLinksList = () => (
    <>
      <NavLink to="/offline-scholarships" className="nav-link multi-line" onClick={closeMenu}>
        <span>Offline</span>
        <span>Scholarship</span>
      </NavLink>
      <NavLink to="/online-scholarships" className="nav-link multi-line" onClick={closeMenu}>
        <span>Online</span>
        <span>Scholarship</span>
      </NavLink>
      <NavLink to="/banking-scholarships" className="nav-link multi-line" onClick={closeMenu}>
        <span>Banking</span>
        <span>Scholarship</span>
      </NavLink>
      <NavLink to="/state-scholarships" className="nav-link multi-line" onClick={closeMenu}>
        <span>State</span>
        <span>Scholarship</span>
      </NavLink>
      <NavLink to="/loans" className="nav-link multi-line" onClick={closeMenu}>
        <span>Interest Free</span>
        <span>Loan</span>
      </NavLink>
      <NavLink to="/internships" className="nav-link multi-line" onClick={closeMenu}>
        <span>Internships</span>
        <span>& Jobs</span>
      </NavLink>
      <NavLink to="/vision" className="nav-link multi-line vision-link" onClick={closeMenu}>
        <span>Vision &</span>
        <span>Planning</span>
      </NavLink>
    </>
  );

  return (
    <nav className="navbar">
      <div className="nav-container full-width">
        <div className="nav-section left">
          <button className="mobile-menu-toggle" onClick={toggleMenu}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
          <Link to="/" className="logo-container" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }} onClick={closeMenu}>
            <img src="/logo.png" alt="E2E Logo" style={{ height: '60px', width: 'auto' }} />
            <div className="brand-text" style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="brand-title" style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--primary-color)', lineHeight: '1.1' }}>E2E Opportunities</span>
              <span className="brand-slogan" style={{ fontSize: '0.85rem', fontStyle: 'italic', color: 'var(--text-color)', opacity: 0.7, fontWeight: '500' }}>"Education to Employment"</span>
            </div>
          </Link>
        </div>

        <div className="nav-section center">
          <div className="nav-links main-nav">
             <NavLinksList />
          </div>
        </div>

        <div className="nav-section right">
          <div className="nav-profile-group">
            <button 
              onClick={toggleTheme} 
              className="theme-toggle nav-link" 
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '10px' }}
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {user?.isAdmin && (
              <NavLink to="/admin" className="nav-link admin-link" onClick={closeMenu} title="Admin Dashboard">
                <Settings size={20} />
                <span className="desktop-only text">Admin</span>
              </NavLink>
            )}
            <NavLink to="/profile" className="nav-link profile-icon" onClick={closeMenu} title="User Profile">
              <User size={24} />
            </NavLink>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <div className={`mobile-nav-overlay ${isMenuOpen ? 'open' : ''}`}>
        <NavLinksList />
        {user?.isAdmin && (
          <NavLink to="/admin" className="nav-link admin-link" onClick={closeMenu}>
            <Settings size={20} />
            <span>Admin Dashboard</span>
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
