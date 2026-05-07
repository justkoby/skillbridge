import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Eye, Pause, Edit } from 'lucide-react';

const mockJobs = [
  { id: 1, title: 'UI/UX Design Intern', type: 'Internship', applicants: 43, matches: 8, status: 'Active', posted: '2 days ago' },
  { id: 2, title: 'Frontend Developer', type: 'Entry-Level', applicants: 78, matches: 15, status: 'Active', posted: '5 days ago' },
  { id: 3, title: 'Data Analyst Attaché', type: 'National Service', applicants: 120, matches: 22, status: 'Active', posted: '1 week ago' },
  { id: 4, title: 'Product Design Intern', type: 'Internship', applicants: 31, matches: 6, status: 'Paused', posted: '2 weeks ago' },
];

const ManageJobsPanel = ({ onNavigate }) => {
  const [jobs, setJobs] = useState(mockJobs);

  const togglePause = (id) => {
    setJobs(prev => prev.map(j =>
      j.id === id ? { ...j, status: j.status === 'Active' ? 'Paused' : 'Active' } : j
    ));
  };

  return (
    <div className="panel-content">
      <div className="panel-header">
        <div>
          <h2>Manage Jobs</h2>
          <p className="muted">View and manage all your active job listings.</p>
        </div>
        <button className="btn primary" onClick={() => onNavigate('post-job')}>+ Post New Job</button>
      </div>

      <div style={{ display: 'grid', gap: '16px' }}>
        {jobs.map((job, i) => (
          <motion.div key={job.id} className="manage-job-card"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '6px' }}>
                  <h3 style={{ margin: 0, fontSize: '1.05rem' }}>{job.title}</h3>
                  <span className={`status-pill ${job.status === 'Active' ? 'active' : 'paused'}`}>
                    {job.status}
                  </span>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>{job.type} · Posted {job.posted}</div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="btn" style={{ padding: '8px 14px', fontSize: '0.85rem' }}>
                  <Edit size={15} /> Edit
                </button>
                <button className="btn" style={{ padding: '8px 14px', fontSize: '0.85rem' }}
                  onClick={() => togglePause(job.id)}>
                  <Pause size={15} /> {job.status === 'Active' ? 'Pause' : 'Resume'}
                </button>
                <button className="btn primary" style={{ padding: '8px 14px', fontSize: '0.85rem' }}
                  onClick={() => onNavigate('candidates')}>
                  <Eye size={15} /> View Candidates
                </button>
              </div>
            </div>

            <div className="job-stat-row">
              <div className="job-stat">
                <Users size={16} />
                <span><strong>{job.applicants}</strong> applicants</span>
              </div>
              <div className="job-stat" style={{ color: 'var(--brand)' }}>
                <span>✦</span>
                <span><strong>{job.matches}</strong> strong matches</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginBottom: '4px' }}>
                  Match quality: {Math.round((job.matches / job.applicants) * 100)}% strong candidates
                </div>
                <div className="bar-track" style={{ height: '4px' }}>
                  <div className="bar-fill" style={{ width: `${(job.matches / job.applicants) * 100}%` }} />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ManageJobsPanel;
