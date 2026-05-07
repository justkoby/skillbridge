import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { interviewQAData } from '../../services/chatbotService';
import { Star } from 'lucide-react';

const categories = [
  { key: 'general', label: '🎯 General', color: 'var(--brand)' },
  { key: 'behavioral', label: '🧠 Behavioral', color: '#8B5CF6' },
  { key: 'technical', label: '💻 Technical', color: '#4F7CFF' },
];

const MockInterviewPanel = () => {
  const [category, setCategory] = useState('general');
  const [currentQ, setCurrentQ] = useState(0);
  const [mode, setMode] = useState('browse'); // 'browse' | 'practice'
  const [ratings, setRatings] = useState({});
  const [showTip, setShowTip] = useState({});

  const questions = interviewQAData[category] || [];
  const currentQuestion = questions[currentQ];

  const rateQuestion = (qIndex, stars) => {
    setRatings(prev => ({ ...prev, [`${category}-${qIndex}`]: stars }));
  };

  const StarRating = ({ qIndex }) => {
    const key = `${category}-${qIndex}`;
    const current = ratings[key] || 0;
    return (
      <div style={{ display: 'flex', gap: '4px', marginTop: '8px' }}>
        {[1, 2, 3, 4, 5].map(n => (
          <Star key={n} size={18} fill={n <= current ? '#F4A900' : 'none'}
            style={{ color: '#F4A900', cursor: 'pointer' }}
            onClick={() => rateQuestion(qIndex, n)} />
        ))}
        {current > 0 && (
          <span style={{ fontSize: '0.78rem', color: 'var(--muted)', marginLeft: '4px', alignSelf: 'center' }}>
            {current >= 4 ? 'Excellent!' : current >= 3 ? 'Good' : current >= 2 ? 'Needs work' : 'Practice more'}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="panel-content">
      <div className="panel-header">
        <div>
          <h2>Mock Interview</h2>
          <p className="muted">Practice answering common interview questions. Rate yourself to track improvement.</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className={`btn ${mode === 'browse' ? 'primary' : ''}`} onClick={() => setMode('browse')} style={{ padding: '8px 20px' }}>Browse</button>
          <button className={`btn ${mode === 'practice' ? 'primary' : ''}`} onClick={() => { setMode('practice'); setCurrentQ(0); }} style={{ padding: '8px 20px' }}>Practice Mode</button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="tab-row" style={{ marginBottom: '28px' }}>
        {categories.map(cat => (
          <button key={cat.key} className={`tab-btn ${category === cat.key ? 'active' : ''}`}
            onClick={() => { setCategory(cat.key); setCurrentQ(0); }}>
            {cat.label}
          </button>
        ))}
      </div>

      {mode === 'browse' ? (
        <div style={{ display: 'grid', gap: '16px', maxWidth: '780px' }}>
          {questions.map((item, i) => (
            <motion.div key={i} className="interview-card"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ fontWeight: '700', fontSize: '1rem', flex: 1 }}>"{item.q}"</div>
                <button className="btn" style={{ padding: '6px 14px', fontSize: '0.82rem', whiteSpace: 'nowrap' }}
                  onClick={() => setShowTip(prev => ({ ...prev, [i]: !prev[i] }))}>
                  {showTip[i] ? 'Hide Tip' : 'Show Tip'}
                </button>
              </div>

              <AnimatePresence>
                {showTip[i] && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    style={{ background: 'rgba(46,158,77,0.05)', border: '1px solid var(--brand-light)', borderRadius: '10px', padding: '12px', marginTop: '12px' }}>
                    <div style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: '1.6' }}>
                      💡 <strong>Tip:</strong> {item.tip}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--border)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '4px' }}>Rate your confidence answering this:</div>
                <StarRating qIndex={i} />
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div style={{ maxWidth: '640px' }}>
          {currentQuestion && (
            <motion.div key={`${category}-${currentQ}`} className="glass-card"
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '12px', fontWeight: '600' }}>
                Question {currentQ + 1} of {questions.length}
              </div>
              <div className="bar-track" style={{ marginBottom: '24px' }}>
                <div className="bar-fill" style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }} />
              </div>

              <h3 style={{ marginBottom: '24px', lineHeight: '1.4' }}>"{currentQuestion.q}"</h3>

              <textarea placeholder="Type your answer here for practice..." rows="5"
                style={{ width: '100%', padding: '14px', border: '1px solid var(--border)', borderRadius: '12px', background: 'var(--bg)', color: 'var(--text)', resize: 'vertical', fontFamily: 'inherit', fontSize: '0.9rem' }} />

              <div style={{ background: 'rgba(46,158,77,0.05)', border: '1px solid var(--brand-light)', borderRadius: '10px', padding: '14px', margin: '16px 0' }}>
                <div style={{ fontWeight: '600', marginBottom: '4px', color: 'var(--brand)' }}>💡 Tip</div>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--muted)', lineHeight: '1.6' }}>{currentQuestion.tip}</p>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: '500', marginBottom: '8px' }}>How confident are you with this answer?</div>
                <StarRating qIndex={currentQ} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
                <button className="btn" style={{ flex: 1 }} disabled={currentQ === 0} onClick={() => setCurrentQ(q => q - 1)}>← Previous</button>
                {currentQ < questions.length - 1
                  ? <button className="btn primary" style={{ flex: 1 }} onClick={() => setCurrentQ(q => q + 1)}>Next Question →</button>
                  : <button className="btn primary" style={{ flex: 1 }} onClick={() => setCurrentQ(0)}>Start Over 🔄</button>
                }
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};

export default MockInterviewPanel;
