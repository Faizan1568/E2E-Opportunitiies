import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Navigate } from 'react-router-dom';
import { PlusCircle, Database, CheckCircle } from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { addScholarship } = useData();

  if (!user || !user.isAdmin) {
    return <Navigate to="/login" />;
  }

  const SuccessModal = ({ show, onClose }) => {
    if (!show) return null;
    return (
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999, backdropFilter: 'blur(5px)' }}>
        <div className="glass" style={{ padding: '40px', textAlign: 'center', backgroundColor: 'var(--admin-form-bg)', border: '2px solid #22c55e', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', maxWidth: '400px', width: '90%' }}>
          <div style={{ width: '80px', height: '80px', backgroundColor: 'rgba(34, 197, 94, 0.2)', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 20px' }}>
            <CheckCircle size={48} color="#22c55e" />
          </div>
          <h2 style={{ color: 'white', marginBottom: '10px' }}>Success!</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem' }}>Added details Successfully</p>
          <button onClick={onClose} className="btn btn-secondary" style={{ marginTop: '30px', width: '100%' }}>Great!</button>
        </div>
      </div>
    );
  };

  const EntryForm = () => {
    const [formData, setFormData] = useState({
      name: '',
      amount: '',
      category: 'UG',
      eligibility: '',
      status: 'Available',
      mode: 'Online',
      applyLink: '',
      address: '',
      image: '',
      city: '',
    });

    const [showModal, setShowModal] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      const success = await addScholarship(formData);
      if (success) {
        setShowModal(true);
        setFormData({ 
          name: '', 
          amount: '', 
          category: 'UG', 
          eligibility: '', 
          status: 'Available', 
          mode: 'Online', 
          applyLink: '', 
          address: '',
          image: '',
          city: '',
        });
      }
    };

    return (
      <form onSubmit={handleSubmit} className="glass" style={{ padding: '40px', color: 'var(--header-text)', backgroundColor: 'var(--admin-form-bg)', maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ color: 'var(--header-text)', marginBottom: '30px', textAlign: 'center' }}>Add Details</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '8px' }}>Name / Title</label>
            <input 
              type="text" 
              placeholder="Scholarship/Loan Name" 
              required 
              value={formData.name} 
              onChange={e => setFormData({...formData, name: e.target.value})} 
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none' }} 
            />
          </div>

          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '8px' }}>Amount / Benefit</label>
            <input 
              type="text" 
              placeholder="e.g. 55000 ₹ or Interest Free" 
              required 
              value={formData.amount} 
              onChange={e => setFormData({...formData, amount: e.target.value})} 
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none' }} 
            />
          </div>

          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '8px' }}>Category</label>
            <select 
              value={formData.category} 
              onChange={e => setFormData({...formData, category: e.target.value})} 
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none' }}
            >
              <option>UG</option><option>PG</option><option>Masters</option><option>PHD</option><option>VIII-XII</option><option>All</option>
            </select>
          </div>

          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '8px' }}>Type / Mode</label>
            <select 
              value={formData.mode} 
              onChange={e => setFormData({...formData, mode: e.target.value})} 
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none' }}
            >
              <option value="Online">Online Scholarship</option>
              <option value="Offline">Offline Scholarship</option>
              <option value="state">State Scholarship</option>
              <option value="bank">Banking Scholarship</option>
              <option value="Loan">Interest Free Loan</option>
              <option value="Internship">Internship & Job</option>
            </select>
          </div>

          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '8px' }}>Eligibility</label>
            <input 
              type="text" 
              placeholder="Eligibility criteria" 
              value={formData.eligibility} 
              onChange={e => setFormData({...formData, eligibility: e.target.value})} 
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none' }} 
            />
          </div>

          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '8px' }}>Status</label>
            <select 
              value={formData.status} 
              onChange={e => setFormData({...formData, status: e.target.value})} 
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none' }}
            >
              <option value="Available">Available</option>
              <option value="Soon">Coming Soon</option>
              <option value="Not Available">Not Available</option>
            </select>
          </div>

          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>Application Link</label>
            <input 
              type="text" 
              placeholder="https://..." 
              required 
              value={formData.applyLink} 
              onChange={e => setFormData({...formData, applyLink: e.target.value})} 
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none' }} 
            />
          </div>

          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>Image URL (Optional)</label>
            <input 
              type="text" 
              placeholder="Logo URL" 
              value={formData.image} 
              onChange={e => setFormData({...formData, image: e.target.value})} 
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none' }} 
            />
          </div>

          {formData.mode === 'Offline' && (
            <>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', marginBottom: '8px' }}>Address</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Full Address" 
                  value={formData.address} 
                  onChange={e => setFormData({...formData, address: e.target.value})} 
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none' }} 
                />
              </div>
              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '8px' }}>City (For Filter)</label>
                <input 
                  type="text" 
                  placeholder="e.g. Mumbai" 
                  value={formData.city} 
                  onChange={e => setFormData({...formData, city: e.target.value})} 
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none' }} 
                />
              </div>
            </>
          )}

        </div>

        <button type="submit" className="btn btn-secondary" style={{ marginTop: '30px', width: '100%', padding: '15px', fontSize: '1.1rem' }}>
          Add Details Entry
        </button>

        <SuccessModal show={showModal} onClose={() => setShowModal(false)} />
      </form>
    );
  };

  return (
    <div className="container" style={{ padding: '60px 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1>Admin Dashboard</h1>
        <p style={{ opacity: 0.8 }}>Welcome, Admin! Manage all opportunities effortlessly here.</p>
      </div>

      <EntryForm />

      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <button 
          onClick={() => { localStorage.removeItem('e2e_scholarships'); window.location.reload(); }} 
          style={{ background: 'none', border: '1px solid #ef4444', color: '#ef4444', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', opacity: 0.6 }}
        >
          Reset All Local Data
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
