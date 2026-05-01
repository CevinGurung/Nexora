import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, Mail, Lock, Loader2, ShieldCheck, ShoppingBag, User } from 'lucide-react';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const user = await login(email, password);
      if (user.role === 'ROLE_ADMIN') navigate('/admin');
      else if (user.role === 'ROLE_VENDOR') navigate('/vendor');
      else navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 blur-[120px] rounded-full" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card w-full max-w-md p-8 relative z-10"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary mb-4 shadow-neon">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold mb-2">Welcome Back</h1>
          <p className="text-text-muted">Login to access your Nexora dashboard</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-accent/10 border border-accent/20 text-accent p-3 rounded-xl mb-6 text-sm flex items-center gap-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input 
                type="email" 
                placeholder="commander@nexora.gg" 
                className="w-full pl-12"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full pl-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="neon-btn w-full flex items-center justify-center gap-2"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                Enter System
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center space-y-4">
          <p className="text-text-muted text-sm">
            Don't have an account? 
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Link 
              to="/register?type=customer"
              className="flex flex-col items-center p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all group"
            >
              <User className="w-6 h-6 mb-2 text-text-muted group-hover:text-primary" />
              <span className="text-xs font-semibold">Join as Gamer</span>
            </Link>
            <Link 
              to="/register?type=vendor"
              className="flex flex-col items-center p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-secondary/50 transition-all group"
            >
              <ShoppingBag className="w-6 h-6 mb-2 text-text-muted group-hover:text-secondary" />
              <span className="text-xs font-semibold">Start Shop</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
