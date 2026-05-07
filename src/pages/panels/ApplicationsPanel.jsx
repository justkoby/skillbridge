import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { mockApplications } from '../../data/ghanaianData';

const statusConfig = {
  Applied:      { color: 'var(--muted)', bg: 'rgba(107,114,128,0.1)', label: 'Applied' },
  Reviewing:    { color: '#F4A900', bg: 'rgba(244,169,0,0.1)', label: 'Reviewing' },
  Shortlisted:  { color: '#4F7CFF', bg: 'rgba(79,124,255,0.1)', label: 'Shortlisted' },
  Interviewing: { color: '#8B5CF6', bg: 'rgba(139,92,246,0.1)', label: 'Interviewing' },
  Accepted:     { color: 'var(--brand)', bg: 'rgba(46,158,77,0.1)', label: 'Accepted ✓' },
  Rejected:     { color: '#ef4444', bg: 'rgba(239,68,68,0.1)', label: 'Not Selected' },
};

const tabs = ['All', 'Applied', 'Interviewing', 'Accepted', 'Rejected'];

const ApplicationsPanel = () => {
  const [activeTab, setActiveTab] = useState('All');

  const filtered = activeTab === 'All'
    ? mockApplications
    : mockApplications.filter(a =>
        activeTab === 'Interviewing'
          ? ['Interviewing', 'Shortlisted', 'Reviewing'].includes(a.status)
          : a.status === activeTab
      );

  return (
    <div className="panel-content">
      <div className="panel-header">
        <div>
          <h2>My Applications</h2>
          <p className="muted">Track all your job applications in one place.</p>
        </div>
        <div className="match-badge"><span>{mockApplications.length} applications</span></div>
      </div>

      <div className="tab-row" style={{ marginBottom: '24px' }}>
        {tabs.map(tab => (
          <button key={tab} className={`tab-btn ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
            {tab}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gap: '16px' }}>
        {filtered.length === 0 ? (
          <div className="empty-state">
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📭</div>
            <h4>No applications here yet</h4>
            <p className="muted">Start applying to jobs in the Career Matches section.</p>
          </div>
        ) : filtered.map((app, i) => {
          const status = statusConfig[app.status] || statusConfig['Applied'];
          return (
            <motion.div key={app.id} className="app-card"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }} whileHover={{ y: -2 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '1rem', marginBottom: '4px' }}>{app.role}</div>
                  <div style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '8px' }}>{app.company}</div>
                  <div style={{ display: 'flex', gap: '12px', fontSize: '0.82rem', color: 'var(--muted)', alignItems: 'center' }}>
                    <span><Clock size={13} style={{ display: 'inline', marginRight: '4px' }} />Applied {app.appliedDate}</span>
                    <span style={{
                      background: `${status.color}15`, color: status.color,
                      padding: '2px 10px', borderRadius: '99px', fontWeight: '600',
                    }}>
                      {status.label}
                    </span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: '700', color: app.match >= 80 ? 'var(--brand)' : '#F4A900' }}>{app.match}%</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>match</div>
                </div>
              </div>
              <div style={{ marginTop: '14px', display: 'flex', gap: '8px' }}>
                <button className="btn" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>View Job</button>
                {['Reviewing', 'Shortlisted', 'Interviewing'].includes(app.status) && (
                  <button className="btn primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>Prepare for Interview</button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ApplicationsPanel;
