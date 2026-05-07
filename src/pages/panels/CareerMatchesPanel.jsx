import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Users, ChevronRight, Sparkles } from 'lucide-react';
import { jobListings, companies } from '../../data/ghanaianData';

const CareerMatchesPanel = () => {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Internship', 'Entry-Level', 'National Service'];

  const filtered = jobListings.filter(j =>
    filter === 'All' ? true : j.type.includes(filter)
  );

  return (
    <div className="panel-content">
      <div className="panel-header">
        <div>
          <h2>Career Opportunities</h2>
          <p className="muted">Career opportunities that match your current skills.</p>
        </div>
        <div className="match-badge">
          <Sparkles size={16} />
          <span>{jobListings.length} matches found</span>
        </div>
      </div>

      {/* Filters */}
      <div className="tab-row" style={{ marginBottom: '24px' }}>
        {filters.map(f => (
          <button key={f} className={`tab-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
            {f}
          </button>
        ))}
      </div>

      <div className="matches-layout">
        {/* Job List */}
        <div className="job-list">
          {filtered.map((job, i) => {
            const company = companies.find(c => c.name === job.company);
            return (
              <motion.div
                key={job.id}
                className={`job-card ${selected?.id === job.id ? 'selected' : ''}`}
                onClick={() => setSelected(job)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -2 }}
              >
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div
                    className="company-abbr"
                    style={{ background: company?.color || 'var(--brand)', color: 'white' }}
                  >
                    {company?.abbr || job.company.slice(0, 2).toUpperCase()}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div className="job-title">{job.title}</div>
                        <div className="job-company">{job.company}</div>
                      </div>
                      <div className="match-score" style={{
                        background: job.match >= 80 ? 'rgba(46,158,77,0.1)' : 'rgba(244,169,0,0.1)',
                        color: job.match >= 80 ? 'var(--brand)' : '#F4A900',
                      }}>
                        {job.match}% match
                      </div>
                    </div>
                    <div className="job-meta">
                      <span><MapPin size={13} /> {job.location}</span>
                      <span><Clock size={13} /> {job.posted}</span>
                      <span className="job-type-badge">{job.type}</span>
                    </div>
                  </div>
                </div>
                <div className="match-bar-wrap">
                  <div className="bar-track">
                    <motion.div
                      className="bar-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${job.match}%` }}
                      transition={{ duration: 0.6, delay: i * 0.05 }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Detail Panel */}
        <div className="job-detail-panel">
          {selected ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ marginBottom: '4px' }}>{selected.title}</h3>
                <div className="job-company" style={{ marginBottom: '12px' }}>{selected.company} · {selected.location}</div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span className="job-type-badge">{selected.type}</span>
                  <span className="job-type-badge" style={{ background: 'rgba(46,158,77,0.1)', color: 'var(--brand)' }}>
                    {selected.match}% match
                  </span>
                </div>
              </div>

              <div className="detail-section">
                <h5>About this role</h5>
                <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: 'var(--muted)' }}>{selected.description}</p>
              </div>

              <div className="detail-section">
                <h5>Skills Required</h5>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {selected.skills.map(s => (
                    <span key={s} className="chip success">{s}</span>
                  ))}
                </div>
              </div>

              <div className="detail-section">
                <h5>Compensation</h5>
                <p style={{ fontWeight: '600', color: 'var(--brand)' }}>{selected.salary}</p>
              </div>

              <div className="detail-section">
                <h5>Competition</h5>
                <p style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>
                  <Users size={14} style={{ display: 'inline', marginRight: '6px' }} />
                  {selected.applicants} applicants so far
                </p>
              </div>

              <button className="btn primary" style={{ width: '100%', marginTop: '16px' }}>
                Apply Now
              </button>
              <button className="btn" style={{ width: '100%', marginTop: '10px' }}>
                Save for Later
              </button>
            </motion.div>
          ) : (
            <div className="empty-state">
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🎯</div>
              <h4>Select a role to view details</h4>
              <p className="muted">Click on any job card to see full details and apply.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CareerMatchesPanel;
