import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Mail, Lock, Eye, EyeOff, Users, ArrowRight, Sun, Moon } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [category, setCategory] = useState('Student');
  const [role, setRole] = useState('user');
  const { login, signup } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      const res = await login(email, password, role);
      if (res.success) {
        navigate('/');
      } else {
        alert(res.message);
      }
    } else {
      const res = await signup({ email, password, category, role });
      if (res.success) {
        alert('Signup successful! Please login.');
        setIsLogin(true);
      } else {
        alert(res.message);
      }
    }
  };

  return (
    <div className="auth-page" style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      padding: '20px',
      position: 'relative'
    }}>
      {/* Standalone Theme Toggle for Auth Page */}
      <button 
        onClick={toggleTheme}
        className="glass"
        style={{
          position: 'absolute',
          top: '30px',
          right: '30px',
          background: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
          padding: '12px',
          borderRadius: '50%',
          cursor: 'pointer',
          color: 'var(--primary-color)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--card-shadow)',
          zIndex: 10
        }}
        title="Toggle Theme"
      >
        {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
      </button>
      <div className="glass auth-card" style={{
        padding: '30px 40px',
        maxWidth: '480px',
        width: '100%',
        boxShadow: 'var(--card-shadow)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Branding */}
        <div style={{ textAlign: 'center', marginBottom: '25px' }}>
          <img 
            src="/logo.png" 
            alt="Logo" 
            style={{ height: '120px', width: 'auto', marginBottom: '10px' }} 
          />
        </div>

        <h2 style={{ textAlign: 'center', marginBottom: '20px', fontWeight: '800' }}>
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Role Selection */}
          <div className="filter-group" style={{ marginBottom: '15px' }}>
            <label className="filter-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users size={14} /> I am a...
            </label>
            <select 
              className="modern-select"
              value={role} 
              onChange={e => setRole(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '12px',
                border: '2px solid var(--primary-color)',
                backgroundColor: 'var(--card-bg)',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                appearance: 'auto'
              }}
            >
              <option value="user">User / Student</option>
              <option value="admin">Administrator</option>
            </select>
          </div>

          {/* Email */}
          <div className="filter-group" style={{ marginBottom: '15px' }}>
            <label className="filter-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Mail size={14} /> Email Address
            </label>
            <input 
              type="email" 
              className="modern-select"
              required 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              placeholder="name@example.com"
              style={{ width: '100%', padding: '12px' }}
            />
          </div>

          {/* Password */}
          <div className="filter-group" style={{ marginBottom: '15px', position: 'relative' }}>
            <label className="filter-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Lock size={14} /> Password
            </label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showPassword ? 'text' : 'password'} 
                className="modern-select"
                required 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                placeholder="enter password"
                style={{ width: '100%', padding: '12px', paddingRight: '50px' }}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '15px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--primary-color)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 2,
                  transition: 'var(--transition)'
                }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {!isLogin && role === 'user' && (
            <div className="filter-group" style={{ marginBottom: '15px' }}>
              <label className="filter-label">Academic Category</label>
              <select 
                className="modern-select"
                value={category} 
                onChange={e => setCategory(e.target.value)}
                style={{ width: '100%', padding: '12px' }}
              >
                <option>Student</option>
                <option>Graduate</option>
                <option>Professional</option>
              </select>
            </div>
          )}

          <button type="submit" className="btn btn-primary" style={{ 
            width: '100%', 
            padding: '14px', 
            fontSize: '1.1rem', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '10px',
            marginTop: '10px',
            boxShadow: '0 4px 15px rgba(var(--primary-color-rgb), 0.3)'
          }}>
            {isLogin ? 'Sign In' : 'Sign Up'}
            <ArrowRight size={20} />
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.9rem', opacity: 0.9 }}>
          {isLogin ? "New to E2E? " : "Already have an account? "}
          <span 
            onClick={() => setIsLogin(!isLogin)} 
            style={{ 
              color: 'var(--secondary-color)', 
              cursor: 'pointer', 
              fontWeight: '800', 
              textDecoration: 'underline',
              marginLeft: '5px'
            }}
          >
            {isLogin ? 'Create Account' : 'Login Here'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Auth;
