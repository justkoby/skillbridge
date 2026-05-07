import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, User } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';

const HomePage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(email, password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
  };

  return (
    <AuthLayout 
      title="SkillBridge Portal" 
      subtitle="Sign in to access your dashboard"
    >
      <div className="auth-form-content">
        {error && <div className="alert danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label className="form-label">Email / Student ID</label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={20} />
              <input 
                className="form-input" 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
          </div>

          <div className="form-field">
            <label className="form-label">Password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" size={20} />
              <input 
                className="form-input" 
                type="password" 
                placeholder="Enter your password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
          </div>

          <div className="flex" style={{ justifyContent: 'space-between', marginBottom: '20px', fontSize: '0.85rem' }}>
            <label className="flex" style={{ gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" /> Remember me
            </label>
            <Link to="#" className="brand-text" style={{ fontWeight: '600' }}>Forgot password?</Link>
          </div>

          <button type="submit" className="btn primary w-full">
            Sign In
          </button>
        </form>

        <p className="auth-footer" style={{ marginTop: '24px', textAlign: 'center' }}>
          Don't have an account? <Link to="/signup" className="brand-text" style={{ fontWeight: '700' }}>Create an account</Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default HomePage;
