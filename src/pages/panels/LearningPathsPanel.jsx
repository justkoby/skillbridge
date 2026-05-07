import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ChevronRight, Play, Lock, CheckCircle, X } from 'lucide-react';
import { learningTracks } from '../../data/ghanaianData';

const statusIcon = {
  completed: <CheckCircle size={16} style={{ color: 'var(--brand)' }} />,
  in_progress: <Play size={16} style={{ color: '#F4A900' }} />,
  locked: <Lock size={16} style={{ color: 'var(--muted)' }} />,
};

const LearningPathsPanel = () => {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="panel-content">
      <div className="panel-header">
        <div>
          <h2>Learning Paths</h2>
          <p className="muted">Your personalized career development tracks. Learn at your own pace.</p>
        </div>
      </div>

      {/* Track Cards - Netflix Style */}
      <div className="tracks-grid">
        {learningTracks.map((track, i) => (
          <motion.div
            key={track.id}
            className="track-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4 }}
          >
            <div className="track-icon" style={{ background: track.bgColor, color: track.color }}>
              <span style={{ fontSize: '2rem' }}>{track.icon}</span>
            </div>

            <div className="track-body">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{track.title}</h3>
                <span className="match-score" style={{
                  background: `${track.color}15`,
                  color: track.color,
                  fontSize: '0.78rem',
                }}>
                  {track.matchScore}% match
                </span>
              </div>

              <p className="muted" style={{ margin: '8px 0 16px', fontSize: '0.9rem' }}>
                {track.description}
              </p>

              <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', fontSize: '0.85rem', color: 'var(--muted)' }}>
                <span><Clock size={13} style={{ display: 'inline', marginRight: '4px' }} />{track.duration}</span>
                <span>{track.modules} modules</span>
              </div>

              {/* Progress Bar */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--muted)' }}>Progress</span>
                  <span style={{ fontWeight: '700', color: track.color }}>{track.progress}%</span>
                </div>
                <div className="bar-track">
                  <motion.div
                    className="bar-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${track.progress}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    style={{ background: track.color }}
                  />
                </div>
              </div>

              {/* Career outcomes */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                {track.careerOutcomes.map(o => (
                  <span key={o} style={{
                    fontSize: '0.75rem',
                    padding: '3px 10px',
                    borderRadius: '99px',
                    background: `${track.color}10`,
                    color: track.color,
                    border: `1px solid ${track.color}25`,
                  }}>
                    {o}
                  </span>
                ))}
              </div>

              <button
                className="btn primary"
                style={{ width: '100%', background: track.color }}
                onClick={() => setExpanded(expanded === track.id ? null : track.id)}
              >
                {expanded === track.id ? 'Hide Modules' : track.progress > 0 ? 'Continue' : 'Start Track'}
              </button>
            </div>

            {/* Expandable Modules */}
            <AnimatePresence>
              {expanded === track.id && (
                <motion.div
                  className="modules-list"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  {track.modules_list.map((mod, mi) => (
                    <div key={mi} className={`module-item ${mod.status}`}>
                      {statusIcon[mod.status]}
                      <div style={{ flex: 1 }}>
                        <span style={{ fontWeight: '500', fontSize: '0.9rem' }}>{mod.name}</span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--muted)', marginLeft: '8px' }}>{mod.duration}</span>
                      </div>
                      {mod.status !== 'locked' && (
                        <button className="btn ghost" style={{ padding: '4px 12px', fontSize: '0.8rem' }}>
                          {mod.status === 'completed' ? 'Review' : 'Continue'}
                        </button>
                      )}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LearningPathsPanel;
