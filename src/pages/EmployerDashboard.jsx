import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/DashboardLayout';
import PostJobPanel from './panels/PostJobPanel';
import ManageJobsPanel from './panels/ManageJobsPanel';
import CandidatesPanel from './panels/CandidatesPanel';
import MessagesPanel from './panels/MessagesPanel';
import SettingsPanel from './panels/SettingsPanel';
import { Briefcase, Users, TrendingUp, Calendar, PlusCircle, Eye } from 'lucide-react';
import { candidateProfiles, companies } from '../data/ghanaianData';

const EmployerHome = ({ user, onNavigate, dashboardMode, demoProfile }) => {
  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good Morning';
    if (h < 17) return 'Good Afternoon';
    return 'Good Evening';
  })();

  return (
    <div>
      <motion.div className="welcome-card" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="welcome-text">
          <h2>{greeting}, {user?.name?.split(' ')[0] || 'Kofi'} 👋</h2>
          {dashboardMode === 'personalized' ? (
            <p className="muted">Welcome! Your workspace is ready. <strong style={{ color: 'var(--brand)' }}>Post a job</strong> to start matching with our pool of talented Ghanaian students.</p>
          ) : (
            <p className="muted">You have <strong style={{ color: 'var(--brand)' }}>8 strong candidate matches</strong> waiting for review.</p>
          )}
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn primary" onClick={() => onNavigate('post-job')}>
            <PlusCircle size={18} /> Post a Job
          </button>
          <button className="btn" onClick={() => onNavigate('candidates')}>
            <Eye size={18} /> View Candidates
          </button>
        </div>
      </motion.div>

      <div className="stats-row" style={{ marginBottom: '28px' }}>
        {[
          { icon: <Briefcase size={20}/>, label: 'Active Jobs', value: dashboardMode === 'personalized' ? '0' : '4', trend: dashboardMode === 'personalized' ? 'Post a job' : '2 new this week', color: 'var(--brand)' },
          { icon: <Users size={20}/>, label: 'Total Applicants', value: dashboardMode === 'personalized' ? '0' : '272', trend: dashboardMode === 'personalized' ? '--' : '+43 this week', color: '#4F7CFF' },
          { icon: <TrendingUp size={20}/>, label: 'Strong Matches', value: dashboardMode === 'personalized' ? '0' : '51', trend: dashboardMode === 'personalized' ? '--' : 'AI-selected', color: '#F4A900' },
          { icon: <Calendar size={20}/>, label: 'Interviews Scheduled', value: dashboardMode === 'personalized' ? '0' : '6', trend: dashboardMode === 'personalized' ? '--' : 'This month', color: '#8B5CF6' },
        ].map((s, i) => (
          <motion.div key={s.label} className="stat-card-dash"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            whileHover={{ y: -4 }}
            style={{ opacity: dashboardMode === 'personalized' ? 0.6 : 1 }}>
            <div className="stat-icon" style={{ background: `${s.color}15`, color: s.color }}>{s.icon}</div>
            <div className="stat-val">{s.value}</div>
            <div className="stat-lbl">{s.label}</div>
            <div className="stat-trend">{s.trend}</div>
          </motion.div>
        ))}
      </div>

      <div className="dash-two-col">
        {/* Active Jobs */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h4 style={{ margin: 0 }}>Active Job Listings</h4>
            <button className="btn" style={{ padding: '6px 14px', fontSize: '0.85rem' }}
              onClick={() => onNavigate('manage-jobs')}>View all</button>
          </div>
          {dashboardMode === 'personalized' ? (
            <div className="text-center" style={{ padding: '20px 0', opacity: 0.6 }}>
              <p>You have no active listings. Post your first job to see it here.</p>
            </div>
          ) : (
            [
              { title: 'UI/UX Design Intern', applicants: 43, matches: 8, type: 'Internship' },
              { title: 'Frontend Developer', applicants: 78, matches: 15, type: 'Entry-Level' },
              { title: 'Data Analyst Attaché', applicants: 120, matches: 22, type: 'National Service' },
              { title: 'Product Design Intern', applicants: 31, matches: 6, type: 'Internship' },
            ].map(job => (
              <div key={job.title} className="mini-job-row" style={{ marginBottom: '16px' }}>
                <div className="icon-circle brand-bg" style={{ width: '36px', height: '36px' }}>
                  <Briefcase size={16} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{job.title}</div>
                  <div style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>{job.applicants} applicants · {job.type}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: '700', color: 'var(--brand)', fontSize: '0.9rem' }}>{job.matches} matches</div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Top Candidates */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h4 style={{ margin: 0 }}>Recommended Candidates</h4>
            <button className="btn" style={{ padding: '6px 14px', fontSize: '0.85rem' }}
              onClick={() => onNavigate('candidates')}>See all</button>
          </div>
          {dashboardMode === 'personalized' ? (
            <div className="text-center" style={{ padding: '20px 0', opacity: 0.6 }}>
              <p>Candidates will appear here once you post a job.</p>
            </div>
          ) : (
            candidateProfiles.slice(0, 4).map(c => (
              <div key={c.name} className="mini-job-row" style={{ marginBottom: '16px' }}>
                <div className="candidate-avatar" style={{ width: '36px', height: '36px', fontSize: '0.8rem' }}>{c.avatar}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{c.name}</div>
                  <div style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>{c.role} · {c.university.split('(')[0].trim()}</div>
                </div>
                <div style={{ fontWeight: '700', color: c.match >= 80 ? 'var(--brand)' : '#F4A900', fontSize: '0.9rem' }}>
                  {c.match}%
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const EmployerDashboard = () => {
  const { user, dashboardMode, demoProfile } = useAuth();
  const [activePage, setActivePage] = useState('dashboard');

  const renderPanel = () => {
    switch (activePage) {
      case 'dashboard': return <EmployerHome user={user} onNavigate={setActivePage} dashboardMode={dashboardMode} demoProfile={demoProfile} />;
      case 'post-job': return <PostJobPanel onPost={() => setActivePage('manage-jobs')} />;
      case 'manage-jobs': return <ManageJobsPanel onNavigate={setActivePage} />;
      case 'candidates': return <CandidatesPanel />;
      case 'messages': return <MessagesPanel />;
      case 'settings': return <SettingsPanel />;
      default: return <EmployerHome user={user} onNavigate={setActivePage} dashboardMode={dashboardMode} demoProfile={demoProfile} />;
    }
  };

  return (
    <DashboardLayout activePage={activePage} onNavigate={setActivePage}>
      {renderPanel()}
    </DashboardLayout>
  );
};

export default EmployerDashboard;
