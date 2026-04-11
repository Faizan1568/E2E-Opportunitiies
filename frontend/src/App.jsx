import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ScholarshipsPage from './pages/ScholarshipsPage';
import InternshipsPage from './pages/InternshipsPage';
import AdminDashboard from './pages/AdminDashboard';
import Auth from './pages/Auth';
import VisionPage from './pages/VisionPage';
import './index.css';

const ProfileView = () => {
  const { user, logout } = useAuth();
  return (
    <div className="glass" style={{ padding: '40px', marginTop: '40px', backgroundColor: '#004d40', color: 'white' }}>
      <p style={{ fontSize: '1.5rem', marginBottom: '20px' }}>
        Welcome back, {user?.isAdmin ? 'Admin' : 'Student'}!
      </p>
      <div style={{ textAlign: 'left', maxWidth: '300px', margin: '0 auto' }}>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Role:</strong> {user?.isAdmin ? 'Administrator' : 'Student User'}</p>
      </div>
      <button onClick={logout} className="btn btn-secondary" style={{ marginTop: '30px' }}>Logout</button>
    </div>
  );
};

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && !user.isAdmin) return <Navigate to="/" />;
  return children;
};

const AppContent = () => {
  const { loading, user } = useAuth();

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#004d40', color: 'white' }}>Loading...</div>;
  }

  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {user && <Navbar />}
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/login" element={user ? <Navigate to="/" /> : <Auth />} />
            
            <Route path="/" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            
            <Route path="/banking-scholarships" element={
              <ProtectedRoute>
                <ScholarshipsPage mode="bank" title="Banking Scholarships" description="Premium financial aid from leading banks." />
              </ProtectedRoute>
            } />
            
            <Route path="/state-scholarships" element={
              <ProtectedRoute>
                <ScholarshipsPage mode="state" title="State Scholarships" description="Government-backed opportunities for your education." />
              </ProtectedRoute>
            } />
            
            <Route path="/loans" element={
              <ProtectedRoute>
                <ScholarshipsPage mode="Loan" title="Interest Free Loans" description="Empowering your education through VLS Loans." />
              </ProtectedRoute>
            } />
            
            <Route path="/online-scholarships" element={
              <ProtectedRoute>
                <ScholarshipsPage mode="Online" title="Online Scholarships" description="Global education at your fingertips." />
              </ProtectedRoute>
            } />
            
            <Route path="/offline-scholarships" element={
              <ProtectedRoute>
                <ScholarshipsPage mode="Offline" title="Offline Scholarships" description="Local opportunities to bridge your dreams." />
              </ProtectedRoute>
            } />
            
            <Route path="/internships" element={
              <ProtectedRoute>
                <InternshipsPage />
              </ProtectedRoute>
            } />

            <Route path="/admin" element={
              <ProtectedRoute adminOnly>
                <AdminDashboard />
              </ProtectedRoute>
            } />

            <Route path="/vision" element={
              <ProtectedRoute>
                <VisionPage />
              </ProtectedRoute>
            } />
            
            <Route path="/profile" element={
              <ProtectedRoute>
                <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
                  <h1>User Profile</h1>
                  <ProfileView />
                </div>
              </ProtectedRoute>
            } />

            {/* Default Catch-all */}
            <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
          </Routes>
        </main>
        {user && <Footer />}
      </div>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
