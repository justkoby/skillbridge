import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, MessageSquare, Bookmark, Eye } from 'lucide-react';
import { candidateProfiles } from '../../data/ghanaianData';

const CandidatesPanel = () => {
  const [selected, setSelected] = useState(null);
  const [shortlisted, setShortlisted] = useState([]);

  const toggleShortlist = (name) => {
    setShortlisted(prev =>
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    );
  };

  return (
    <div className="panel-content">
      <div className="panel-header">
        <div>
          <h2>Recommended Candidates</h2>
          <p className="muted">Top candidates matched to your active job listings.</p>
        </div>
        <div className="match-badge">
          <Star size={16} />
          <span>{candidateProfiles.length} strong matches</span>
        </div>
      </div>

      <div className="candidates-layout">
        {/* Candidate Cards */}
        <div className="candidate-list">
          {candidateProfiles.map((c, i) => (
            <motion.div key={c.name}
              className={`candidate-card ${selected?.name === c.name ? 'selected' : ''}`}
              onClick={() => setSelected(c)}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }} whileHover={{ y: -2 }}>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div className="candidate-avatar">{c.avatar}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontWeight: '700', marginBottom: '2px' }}>{c.name}</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>{c.role}</div>
                    </div>
                    <div className="match-score" style={{
                      background: c.match >= 80 ? 'rgba(46,158,77,0.1)' : 'rgba(244,169,0,0.1)',
                      color: c.match >= 80 ? 'var(--brand)' : '#F4A900',
                    }}>
                      {c.match}%
                    </div>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--muted)', marginTop: '6px' }}>
                    <MapPin size={12} style={{ display: 'inline', marginRight: '4px' }} />
                    {c.location} · {c.university}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '10px' }}>
                    {c.skills.slice(0, 3).map(s => (
                      <span key={s} className="chip">{s}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
                <button className="btn primary" style={{ flex: 1, padding: '8px', fontSize: '0.82rem' }}
                  onClick={e => { e.stopPropagation(); setSelected(c); }}>
                  <Eye size={14} /> View Profile
                </button>
                <button className="btn" style={{ padding: '8px 12px', fontSize: '0.82rem' }}>
                  <MessageSquare size={14} />
                </button>
                <button
                  className={`btn ${shortlisted.includes(c.name) ? 'primary' : ''}`}
                  style={{ padding: '8px 12px', fontSize: '0.82rem' }}
                  onClick={e => { e.stopPropagation(); toggleShortlist(c.name); }}>
                  <Bookmark size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detail Panel */}
        <div className="candidate-detail">
          {selected ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div className="candidate-avatar-lg">{selected.avatar}</div>
                <h3 style={{ marginBottom: '4px' }}>{selected.name}</h3>
                <div style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>{selected.role}</div>
                <div style={{ color: 'var(--muted)', fontSize: '0.85rem', marginTop: '4px' }}>
                  <MapPin size={13} style={{ display: 'inline' }} /> {selected.location}
                </div>
              </div>

              <div className="detail-section">
                <h5>Why Matched</h5>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {selected.skills.map(s => (
                    <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                      <span style={{ color: 'var(--brand)' }}>✓</span> {s}
                    </div>
                  ))}
                </div>
              </div>

              <div className="detail-section">
                <h5>Education</h5>
                <p style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>{selected.university}</p>
              </div>

              <div className="detail-section">
                <h5>Experience</h5>
                <p style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>{selected.experience}</p>
              </div>

              <div className="detail-section">
                <h5>CV Strength</h5>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${selected.cvStrength}%` }} />
                </div>
                <div style={{ fontSize: '0.85rem', marginTop: '6px', fontWeight: '700', color: 'var(--brand)' }}>
                  {selected.cvStrength}% strong
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '24px' }}>
                <button className="btn primary" style={{ flex: 1 }}>Message</button>
                <button className="btn" style={{ flex: 1 }} onClick={() => toggleShortlist(selected.name)}>
                  {shortlisted.includes(selected.name) ? '★ Shortlisted' : '☆ Shortlist'}
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="empty-state">
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>👤</div>
              <h4>Select a candidate</h4>
              <p className="muted">Click on any candidate card to view their full profile.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidatesPanel;
