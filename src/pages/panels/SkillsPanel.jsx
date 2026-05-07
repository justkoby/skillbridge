import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Plus, TrendingUp, Zap } from 'lucide-react';

const technicalSkills = [
  { name: 'Figma', level: 85, category: 'Design' },
  { name: 'Adobe XD', level: 70, category: 'Design' },
  { name: 'HTML & CSS', level: 75, category: 'Development' },
  { name: 'JavaScript', level: 55, category: 'Development' },
  { name: 'Microsoft Excel', level: 90, category: 'Analytics' },
  { name: 'Power BI', level: 60, category: 'Analytics' },
  { name: 'User Research', level: 80, category: 'Design' },
  { name: 'Prototyping', level: 75, category: 'Design' },
];

const softSkills = [
  { name: 'Communication', level: 88 },
  { name: 'Teamwork', level: 82 },
  { name: 'Problem Solving', level: 78 },
  { name: 'Critical Thinking', level: 75 },
  { name: 'Time Management', level: 70 },
];

const suggestedSkills = [
  { name: 'Interview Preparation', priority: 'High', reason: 'Boosts your chances by 40%' },
  { name: 'CV Writing', priority: 'High', reason: 'Your CV needs stronger action verbs' },
  { name: 'Presentation Skills', priority: 'Medium', reason: 'Required for most senior roles' },
  { name: 'Digital Collaboration', priority: 'Medium', reason: 'Remote work is growing in Ghana' },
  { name: 'SQL Basics', priority: 'Low', reason: 'Opens data analyst opportunities' },
];

const priorityColors = {
  High: { bg: 'rgba(239,68,68,0.1)', color: '#ef4444', border: 'rgba(239,68,68,0.2)' },
  Medium: { bg: 'rgba(244,169,0,0.1)', color: '#F4A900', border: 'rgba(244,169,0,0.2)' },
  Low: { bg: 'rgba(46,158,77,0.1)', color: '#2E9E4D', border: 'rgba(46,158,77,0.2)' },
};

const SkillsPanel = () => {
  const [activeTab, setActiveTab] = useState('technical');

  return (
    <div className="panel-content">
      <div className="panel-header">
        <div>
          <h2>Your Skills Profile</h2>
          <p className="muted">These skills were identified from your CV and profile. You can review and update them anytime.</p>
        </div>
        <button className="btn primary" style={{ gap: '8px' }}>
          <Plus size={18} /> Add Skill
        </button>
      </div>

      <div className="skills-grid">
        {/* Left: Skill Bars */}
        <div>
          <div className="tab-row" style={{ marginBottom: '24px' }}>
            {['technical', 'soft'].map(tab => (
              <button
                key={tab}
                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'technical' ? 'Technical Skills' : 'Soft Skills'}
              </button>
            ))}
          </div>

          <div className="skill-bars">
            {(activeTab === 'technical' ? technicalSkills : softSkills).map((skill, i) => (
              <motion.div
                key={skill.name}
                className="skill-bar-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="skill-bar-top">
                  <span className="skill-name">{skill.name}</span>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    {skill.category && (
                      <span className="skill-category">{skill.category}</span>
                    )}
                    <span className="skill-pct">{skill.level}%</span>
                  </div>
                </div>
                <div className="bar-track">
                  <motion.div
                    className="bar-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 0.8, delay: i * 0.05 }}
                    style={{
                      background: skill.level >= 80
                        ? 'var(--brand)'
                        : skill.level >= 60
                        ? '#F4A900'
                        : '#ef4444'
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Suggested Skills */}
        <div>
          <div className="panel-section-title">
            <Zap size={18} style={{ color: 'var(--brand)' }} />
            <h4>Skills to Learn Next</h4>
          </div>
          <p className="muted" style={{ marginBottom: '20px', fontSize: '0.9rem' }}>
            These skills can significantly improve your career opportunities.
          </p>

          <div style={{ display: 'grid', gap: '12px' }}>
            {suggestedSkills.map(skill => {
              const style = priorityColors[skill.priority];
              return (
                <div key={skill.name} className="suggested-skill-card">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontWeight: '600' }}>{skill.name}</span>
                    <span className="priority-badge" style={{
                      background: style.bg,
                      color: style.color,
                      border: `1px solid ${style.border}`,
                      padding: '2px 10px',
                      borderRadius: '99px',
                      fontSize: '0.75rem',
                      fontWeight: '700',
                    }}>
                      {skill.priority}
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--muted)' }}>{skill.reason}</p>
                </div>
              );
            })}
          </div>

          <div className="insight-box" style={{ marginTop: '24px' }}>
            <TrendingUp size={18} style={{ color: 'var(--brand)' }} />
            <div>
              <div style={{ fontWeight: '600', marginBottom: '4px' }}>Career Insight</div>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--muted)' }}>
                Your profile is strong for <strong>UI/UX internships</strong> and <strong>Frontend roles</strong>. 
                Adding interview preparation can improve offer rates by 40%.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsPanel;
