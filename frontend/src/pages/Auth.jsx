import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [category, setCategory] = useState('Student');
  const [role, setRole] = useState('user');
  const { login, signup } = useAuth();
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
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div className="glass" style={{
        padding: '40px',
        maxWidth: '400px',
        width: '100%',
        backgroundColor: '#004d40',
        color: 'white',
        boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#ffc107' }}>
          {isLogin ? 'Sign In' : 'Join Community'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>Account Type</label>
            <select 
              value={role} 
              onChange={e => setRole(e.target.value)}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none', background: 'white', color: '#333' }}
            >
              <option value="user">User / Student</option>
              <option value="admin">Administrator</option>
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>Email</label>
            <input 
              type="email" 
              required 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none' }}
              placeholder="Enter your email"
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>Password</label>
            <input 
              type="password" 
              required 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none' }}
              placeholder="Enter your password"
            />
          </div>

          {!isLogin && role === 'user' && (
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px' }}>Category</label>
              <select 
                value={category} 
                onChange={e => setCategory(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none' }}
              >
                <option>Student</option>
                <option>Graduate</option>
                <option>Professional</option>
              </select>
            </div>
          )}
          <button type="submit" className="btn btn-secondary" style={{ width: '100%', marginTop: '10px' }}>
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.9rem' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span 
            onClick={() => setIsLogin(!isLogin)} 
            style={{ color: '#ffc107', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
