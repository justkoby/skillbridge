import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, UserCheck, ArrowRight } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    studentId: '',
    role: 'jobseeker',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    const result = signup(formData.fullname, formData.email, formData.password, formData.role);
    if (result.success) {
      navigate('/dashboard');
    }
  };

  return (
    <AuthLayout 
      title="Create Account" 
      subtitle="Join SkillBridge and unlock your potential."
    >
      <div className="auth-form-content">
        {error && <div className="alert danger" style={{ marginBottom: '20px' }}>{error}</div>}

        <form onSubmit={handleSubmit} className="grid" style={{ gap: '0' }}>
          <div className="form-field">
            <label className="form-label">Full Name</label>
            <div className="input-wrapper">
              <User className="input-icon" size={20} />
              <input 
                className="form-input" 
                type="text" 
                placeholder="Ama Mensah" 
                value={formData.fullname}
                onChange={(e) => setFormData({...formData, fullname: e.target.value})}
                required 
              />
            </div>
          </div>

          <div className="form-field">
            <label className="form-label">Email Address</label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={20} />
              <input 
                className="form-input" 
                type="email" 
                placeholder="you@example.com" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required 
              />
            </div>
          </div>

          <div className="form-field">
            <label className="form-label">Student ID / Username</label>
            <div className="input-wrapper">
              <UserCheck className="input-icon" size={20} />
              <input 
                className="form-input" 
                type="text" 
                placeholder="ID-123456" 
                value={formData.studentId}
                onChange={(e) => setFormData({...formData, studentId: e.target.value})}
                required 
              />
            </div>
          </div>

          <div className="form-field">
            <label className="form-label">Account Role</label>
            <div className="input-wrapper">
              <UserCheck className="input-icon" size={20} />
              <select 
                className="form-input"
                style={{ paddingLeft: '44px' }}
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                required
              >
                <option value="jobseeker">Job Seeker</option>
                <option value="employer">Employer</option>
              </select>
            </div>
          </div>

          <div className="form-field">
            <label className="form-label">Password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" size={20} />
              <input 
                className="form-input" 
                type="password" 
                placeholder="••••••••" 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required 
              />
            </div>
          </div>

          <div className="form-field">
            <label className="form-label">Confirm Password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" size={20} />
              <input 
                className="form-input" 
                type="password" 
                placeholder="••••••••" 
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                required 
              />
            </div>
          </div>

          <button type="submit" className="btn primary w-full" style={{ marginTop: '20px' }}>
            Sign Up
          </button>
        </form>

        <p className="auth-footer" style={{ marginTop: '24px', textAlign: 'center' }}>
          Already have an account? <Link to="/" className="brand-text" style={{ fontWeight: '700' }}>Sign in</Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default SignupPage;
