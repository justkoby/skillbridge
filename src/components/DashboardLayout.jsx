import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import AskSkillBridge from './AskSkillBridge';
import {
  LayoutDashboard, Star, Briefcase, BookOpen, User,
  FileText, MessageSquare, Settings, LogOut,
  Bell, Search, Menu, X, PlusCircle, ListChecks,
  Users, Building2, Sparkles, Mic, Globe
} from 'lucide-react';

const jobSeekerNav = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'skills', label: 'My Skills', icon: Star },
  { id: 'matches', label: 'Career Matches', icon: Briefcase },
  { id: 'learning', label: 'Learning Paths', icon: BookOpen },
  { id: 'profile', label: 'CV Profile', icon: User },
  { id: 'applications', label: 'Applications', icon: FileText },
  { id: 'interview', label: 'Mock Interview', icon: Mic },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
  { id: 'chatbot', label: 'Ask SkillBridge', icon: Sparkles },
  { id: 'opportunities', label: 'Opportunities', icon: Globe },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const employerNav = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'post-job', label: 'Post a Job', icon: PlusCircle },
  { id: 'manage-jobs', label: 'Manage Jobs', icon: ListChecks },
  { id: 'candidates', label: 'Candidate Matches', icon: Users },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
  { id: 'chatbot', label: 'Ask SkillBridge', icon: Sparkles },
  { id: 'company', label: 'Company Profile', icon: Building2 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const DashboardLayout = ({ children, activePage, onNavigate }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isEmployer = user?.role === 'employer';
  const navItems = isEmployer ? employerNav : jobSeekerNav;

  const handleLogout = () => { logout(); navigate('/'); };
  const handleNav = (id) => { onNavigate(id); setSidebarOpen(false); };

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  return (
    <div className={`dash-layout ${sidebarOpen ? 'sidebar-open' : ''}`}>
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className="dash-sidebar">
        <div className="sidebar-top">
          <img src="/skillbridge-logo.svg" alt="SkillBridge" className="sidebar-logo" />
        </div>

        <nav className="sidebar-nav">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`sidebar-item ${activePage === id ? 'active' : ''} ${id === 'chatbot' ? 'sidebar-item-special' : ''}`}
              onClick={() => handleNav(id)}
            >
              <Icon size={20} />
              <span>{label}</span>
              {id === 'chatbot' && <span className="sidebar-item-new">AI</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-user">
            <div className="user-avatar-sm">{initials}</div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">{user?.name || 'User'}</div>
              <div className="sidebar-user-role">{isEmployer ? 'Employer' : 'Job Seeker'}</div>
            </div>
          </div>
          <button className="sidebar-logout" onClick={handleLogout} title="Sign out">
            <LogOut size={18} />
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="dash-main">
        <header className="dash-topbar">
          <button className="burger-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <div className="topbar-search">
            <Search size={18} className="search-icon" />
            <input type="text" placeholder="Search jobs, skills, courses..." />
          </div>
          <div className="topbar-actions">
            <ThemeToggle />
            <div className="notif-btn">
              <Bell size={20} />
              <span className="notif-dot"></span>
            </div>
            <div className="user-avatar-sm topbar-avatar">{initials}</div>
          </div>
        </header>

        <div className="dash-content">
          {children}
        </div>
      </div>

      {/* Floating Chatbot — available on all dashboard pages */}
      <AskSkillBridge />
    </div>
  );
};

export default DashboardLayout;
