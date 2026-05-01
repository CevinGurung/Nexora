import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, Mail, Lock, User, Store, Phone, MapPin, Loader2, ChevronLeft, Gamepad2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RegisterPage = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') || 'customer';
  const isVendor = type === 'vendor';

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    shopName: '',
    description: '',
    phoneNumber: '',
    address: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { registerVendor, registerCustomer } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (isVendor) {
        await registerVendor(formData);
        navigate('/vendor');
      } else {
        await registerCustomer(formData);
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] blur-[120px] rounded-full transition-colors duration-500 ${isVendor ? 'bg-secondary/20' : 'bg-primary/20'}`} />
      <div className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] blur-[120px] rounded-full transition-colors duration-500 ${isVendor ? 'bg-primary/20' : 'bg-secondary/20'}`} />

      <motion.div 
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card w-full max-w-2xl p-8 relative z-10"
      >
        <Link to="/login" className="inline-flex items-center gap-2 text-text-muted hover:text-white mb-8 transition-colors">
          <ChevronLeft className="w-4 h-4" />
          Back to Login
        </Link>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold mb-1">
              Create <span className={isVendor ? 'text-secondary' : 'text-primary'}>Account</span>
            </h1>
            <p className="text-text-muted">Join the Nexora gaming ecosystem</p>
          </div>
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isVendor ? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary'}`}>
            {isVendor ? <Store className="w-6 h-6" /> : <User className="w-6 h-6" />}
          </div>
        </div>

        {error && (
          <div className="bg-accent/10 border border-accent/20 text-accent p-3 rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input name="email" type="email" placeholder="commander@nexora.gg" className="w-full pl-12" onChange={handleChange} required />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input name="password" type="password" placeholder="••••••••" className="w-full pl-12" onChange={handleChange} required />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold ml-1">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input name="phoneNumber" type="tel" placeholder="+1 234 567 890" className="w-full pl-12" onChange={handleChange} required />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <AnimatePresence mode="wait">
              {isVendor ? (
                <motion.div 
                  key="vendor-fields"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <label className="text-sm font-semibold ml-1">Shop Name</label>
                    <div className="relative">
                      <Store className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                      <input name="shopName" type="text" placeholder="Legendary Loot" className="w-full pl-12" onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold ml-1">Shop Description</label>
                    <textarea 
                      name="description" 
                      placeholder="Tell gamers about your shop..." 
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-4 min-h-[115px] outline-none focus:border-secondary transition-all"
                      onChange={handleChange}
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="customer-fields"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <label className="text-sm font-semibold ml-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                      <input name="fullName" type="text" placeholder="John 'Gamer' Doe" className="w-full pl-12" onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold ml-1">Delivery Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                      <input name="address" type="text" placeholder="123 Gaming Street" className="w-full pl-12" onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 flex items-center gap-4 mt-8">
                    <Gamepad2 className="w-8 h-8 text-primary" />
                    <p className="text-xs text-text-muted">You're joining the #1 platform for gaming gear. Prepare for glory.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="md:col-span-2 pt-4">
            <button 
              type="submit" 
              disabled={loading}
              className={`neon-btn w-full flex items-center justify-center gap-2 ${isVendor ? 'from-secondary to-accent' : ''}`}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  Register Now
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
