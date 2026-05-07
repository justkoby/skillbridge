import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, User, LayoutDashboard, Briefcase, Bell } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { notifications } = useNotifications();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="nav">
      <div className="container nav-inner">
        <Link to="/" className="brand">
          <motion.div 
            className="logo"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          />
          <span>SkillBridge</span>
        </Link>

        <div className="nav-links">
          {user ? (
            <>
              <Link to="/dashboard" className={isActive('/dashboard') ? 'active' : ''}>
                <span className="flex" style={{ gap: '6px' }}><LayoutDashboard size={18} /> Dashboard</span>
              </Link>
              <Link to="/profile" className={isActive('/profile') ? 'active' : ''}>
                <span className="flex" style={{ gap: '6px' }}><User size={18} /> Profile</span>
              </Link>
              <Link to="/jobs" className={isActive('/jobs') ? 'active' : ''}>
                <span className="flex" style={{ gap: '6px' }}><Briefcase size={18} /> Jobs</span>
              </Link>
            </>
          ) : (
            <>
              <Link to="/" className={isActive('/') ? 'active' : ''}>Login</Link>
              <Link to="/signup" className={isActive('/signup') ? 'active' : ''}>Sign Up</Link>
            </>
          )}
        </div>

        <div className="nav-actions">
          {user && (
            <motion.div className="notification-bell" whileHover={{ scale: 1.1 }}>
              <Bell size={20} className="muted" />
              {notifications.some(n => !n.read) && <span className="bell-badge"></span>}
            </motion.div>
          )}
          {user ? (
            <button onClick={handleLogout} className="btn ghost flex" style={{ gap: '8px' }}>
              <LogOut size={18} /> Logout
            </button>
          ) : (
            <Link to="/signup" className="btn primary">Get Started</Link>
          )}
          <button className="burger" aria-label="Open menu">☰</button>
        </div>
      </div>

    </nav>
  );
};

export default Navbar;
