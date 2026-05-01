import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import './index.css';

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return children;
};

const Home = () => {
  const { user, logout } = useAuth();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-10 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,242,255,0.1),transparent_50%)]" />
      
      <h1 className="text-7xl font-black mb-4 gaming-gradient tracking-tighter">NEXORA</h1>
      <p className="text-text-muted mb-12 text-xl font-medium">The Multi-Vendor Gaming Marketplace</p>
      
      {user ? (
        <div className="glass-card p-10 flex flex-col items-center gap-6 max-w-md w-full border-primary/20">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-neon">
            <span className="text-3xl font-bold">{user.email[0].toUpperCase()}</span>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">Welcome back,</p>
            <p className="text-primary font-mono">{user.email}</p>
          </div>
          <div className="px-4 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-text-muted">
            {user.role.replace('ROLE_', '')}
          </div>
          <button onClick={logout} className="neon-btn w-full mt-4">Logout Session</button>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* Dashboard routes can be added here with ProtectedRoute */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
