import React from 'react';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <main className="auth-container">
      <div className="auth-card">
        {/* Left Brand Panel */}
        <div className="auth-left">
          <div className="auth-brand">
            <img src="/skillbridge-logo.svg" alt="SkillBridge Logo" className="logo-svg" />
          </div>
          
          <div className="auth-welcome">
            <h2 className="tagline">AI-Driven Skill–Job Matching & Upskilling</h2>
            <h1>Welcome to SkillBridge</h1>
            <p className="auth-subtext">
              Upload your CV, discover your skill-fit score, and get personalized learning recommendations to improve your job readiness.
            </p>
          </div>

          <div className="auth-benefits">
            <div className="benefit-item">
              <div className="check-icon">✓</div>
              <span>Upload your CV</span>
            </div>
            <div className="benefit-item">
              <div className="check-icon">✓</div>
              <span>Get your skill-fit score</span>
            </div>
            <div className="benefit-item">
              <div className="check-icon">✓</div>
              <span>Receive learning recommendations</span>
            </div>
          </div>

          <div className="auth-footer-text">
            © 2026 SkillBridge Student Learning Portal
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="auth-right">
          <div className="auth-header-actions">
            <ThemeToggle />
          </div>
          
          <div className="auth-form-wrapper">
            <div className="auth-form-header">
              <img src="/icon.svg" alt="SkillBridge Icon" className="form-icon-svg" />
              <h2>{title}</h2>
              <p className="muted">{subtitle}</p>
            </div>
            
            {children}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
