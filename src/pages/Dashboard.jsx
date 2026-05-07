import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/DashboardLayout';
import SkillsPanel from './panels/SkillsPanel';
import CareerMatchesPanel from './panels/CareerMatchesPanel';
import LearningPathsPanel from './panels/LearningPathsPanel';
import ApplicationsPanel from './panels/ApplicationsPanel';
import MessagesPanel from './panels/MessagesPanel';
import SettingsPanel from './panels/SettingsPanel';
import MockInterviewPanel from './panels/MockInterviewPanel';
import AskSkillBridgePage from './panels/AskSkillBridgePage';
import ProfilePage from './ProfilePage';
import { FileText, TrendingUp, Award, Zap, Sparkles, CheckCircle, Circle } from 'lucide-react';
import { extractTextFromPDF, detectSkills, detectExperience, calculateJobMatches, analyzeSkillGap } from '../services/aiParser';
import { companies, jobListings, learningTracks } from '../data/ghanaianData';
import { ghanaMarketInsights, cvTips } from '../services/chatbotService';

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Good Morning';
  if (h < 17) return 'Good Afternoon';
  return 'Good Evening';
};

// ── Readiness breakdown ──────────────────────────────────────────────────────
const readinessBreakdown = [
  { label: 'CV Quality', score: 85, icon: '📄' },
  { label: 'Skills', score: 72, icon: '⚡' },
  { label: 'Certifications', score: 45, icon: '🏅' },
  { label: 'Projects', score: 30, icon: '🛠️' },
  { label: 'Communication', score: 80, icon: '💬' },
  { label: 'Experience', score: 60, icon: '💼' },
];

const overallReadiness = Math.round(readinessBreakdown.reduce((s, i) => s + i.score, 0) / readinessBreakdown.length);

// ── Internship checklist ─────────────────────────────────────────────────────
const initialChecklist = [
  { label: 'CV uploaded', done: true },
  { label: 'Skills verified', done: true },
  { label: 'Portfolio added', done: false },
  { label: 'LinkedIn profile connected', done: false },
  { label: 'Mock interview completed', done: false },
];

// ── Opportunity Feed ─────────────────────────────────────────────────────────
const opportunities = [
  { id: 1, type: 'Internship', title: 'UI/UX Design Intern', org: 'Hubtel', date: 'Closes May 30', tag: '🎨', color: '#E84235' },
  { id: 2, type: 'Bootcamp', title: 'Google Africa Dev Training', org: 'Google', date: 'June 2025', tag: '💻', color: '#1A73E8' },
  { id: 3, type: 'Hackathon', title: 'Ghana Fintech Hackathon', org: 'GhIPSS', date: 'May 24–26', tag: '⚡', color: '#F4A900' },
  { id: 4, type: 'Scholarship', title: 'Mastercard Foundation Scholarship', org: 'KNUST', date: 'Applications open', tag: '🎓', color: '#8B5CF6' },
  { id: 5, type: 'Webinar', title: 'Breaking into Tech in Ghana', org: 'Meltwater', date: 'May 20, 6PM', tag: '🌐', color: '#2E9E4D' },
];

// ── Mentors ──────────────────────────────────────────────────────────────────
const mentors = [
  { name: 'Efua Asante', role: 'Senior UI Designer', company: 'Hubtel', avatar: 'EA', experience: '5 years', specialty: 'Product Design', available: true },
  { name: 'Kwabena Osei', role: 'Software Engineer', company: 'MTN Ghana', avatar: 'KO', experience: '7 years', specialty: 'Backend Dev', available: true },
  { name: 'Adwoa Darko', role: 'HR Specialist', company: 'Stanbic Bank', avatar: 'AD', experience: '4 years', specialty: 'Career Coaching', available: false },
];

// ── DashboardHome ────────────────────────────────────────────────────────────
const DashboardHome = ({ user, analysisData, showResults, isParsing, parsingStep, steps, handleFileUpload, dashboardMode, demoProfile }) => {
  const [checklist, setChecklist] = useState(dashboardMode === 'personalized' ? initialChecklist.map(c => ({...c, done: false})) : initialChecklist);
  const done = checklist.filter(c => c.done).length;

  const toggleCheck = (i) => {
    setChecklist(prev => prev.map((c, idx) => idx === i ? { ...c, done: !c.done } : c));
  };

  return (
    <div>
      {/* Welcome */}
      <motion.div className="welcome-card" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="welcome-text">
          <h2>{getGreeting()}, {user?.name?.split(' ')[0] || 'Kwame'} 👋</h2>
          {dashboardMode === 'personalized' ? (
            <p className="muted">Welcome to your new dashboard! Upload your CV below to generate your <strong style={{ color: 'var(--brand)' }}>Career Readiness Score</strong> and uncover matching opportunities.</p>
          ) : (
            <p className="muted">You're <strong style={{ color: 'var(--brand)' }}>{overallReadiness}% career-ready</strong> as an {demoProfile || 'Aspiring Professional'}. Complete your profile to boost your score and unlock more opportunities.</p>
          )}
        </div>
        <div className="career-readiness-ring">
          <svg viewBox="0 0 80 80" width="80" height="80">
            <circle cx="40" cy="40" r="32" fill="none" stroke="var(--border)" strokeWidth="6" />
            <motion.circle cx="40" cy="40" r="32" fill="none" stroke="var(--brand)" strokeWidth="6"
              strokeDasharray={`${2 * Math.PI * 32 * (dashboardMode === 'personalized' ? 0 : (overallReadiness / 100))} ${2 * Math.PI * 32}`}
              strokeLinecap="round" transform="rotate(-90 40 40)"
              initial={{ strokeDasharray: `0 ${2 * Math.PI * 32}` }}
              animate={{ strokeDasharray: `${2 * Math.PI * 32 * (dashboardMode === 'personalized' ? 0 : (overallReadiness / 100))} ${2 * Math.PI * 32}` }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />
          </svg>
          <div className="ring-label">{dashboardMode === 'personalized' ? '0%' : `${overallReadiness}%`}<span>ready</span></div>
        </div>
      </motion.div>

      {/* Stats Row */}
      <div className="stats-row" style={{ marginBottom: '28px' }}>
        {[
          { icon: <FileText size={20}/>, label: 'CV Strength', value: dashboardMode === 'personalized' ? '--' : '85%', trend: dashboardMode === 'personalized' ? 'Pending' : 'Uploaded', color: 'var(--brand)' },
          { icon: <TrendingUp size={20}/>, label: 'Career Matches', value: dashboardMode === 'personalized' ? '0' : '6', trend: dashboardMode === 'personalized' ? 'Waiting for data' : 'This week', color: '#4F7CFF' },
          { icon: <Award size={20}/>, label: 'Skills Detected', value: dashboardMode === 'personalized' ? '0' : '18', trend: dashboardMode === 'personalized' ? 'From your CV' : 'From your CV', color: '#F4A900' },
          { icon: <Zap size={20}/>, label: 'Interview Readiness', value: dashboardMode === 'personalized' ? '--' : '65%', trend: dashboardMode === 'personalized' ? 'Not started' : 'Improving', color: '#8B5CF6' },
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

      {/* Career Readiness Breakdown + Internship Checklist */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
        {/* Readiness Breakdown */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h4 style={{ margin: 0 }}>Career Readiness</h4>
            <div style={{ fontWeight: '800', color: 'var(--brand)', fontSize: '1.4rem' }}>{dashboardMode === 'personalized' ? '0' : overallReadiness}%</div>
          </div>
          {dashboardMode === 'personalized' ? (
            <div className="text-center" style={{ padding: '20px 0', opacity: 0.6 }}>
              <Zap size={32} style={{ margin: '0 auto 12px' }} />
              <p>Upload your CV below to generate your personalized career readiness breakdown.</p>
            </div>
          ) : (
            <>
              {readinessBreakdown.map((item, i) => (
                <div key={item.label} style={{ marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem' }}>
                      <span>{item.icon}</span><span style={{ fontWeight: '500' }}>{item.label}</span>
                    </div>
                    <span style={{ fontWeight: '700', fontSize: '0.85rem', color: item.score >= 70 ? 'var(--brand)' : item.score >= 50 ? '#F4A900' : '#ef4444' }}>{item.score}%</span>
                  </div>
                  <div className="bar-track" style={{ height: '5px' }}>
                    <motion.div className="bar-fill"
                      initial={{ width: 0 }} animate={{ width: `${item.score}%` }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                      style={{ background: item.score >= 70 ? 'var(--brand)' : item.score >= 50 ? '#F4A900' : '#ef4444' }}
                    />
                  </div>
                </div>
              ))}
              <p style={{ margin: '16px 0 0', fontSize: '0.82rem', color: 'var(--muted)', fontStyle: 'italic' }}>
                💡 Add portfolio projects (+20%) and certifications (+15%) to boost your score.
              </p>
            </>
          )}
        </div>

        {/* Internship Readiness Checklist */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h4 style={{ margin: 0 }}>Internship Readiness</h4>
            <span style={{ fontWeight: '700', color: 'var(--brand)', fontSize: '0.88rem' }}>{done}/{checklist.length} done</span>
          </div>
          <div className="bar-track" style={{ marginBottom: '20px' }}>
            <motion.div className="bar-fill" animate={{ width: `${(done / checklist.length) * 100}%` }} transition={{ duration: 0.5 }} />
          </div>
          {checklist.map((item, i) => (
            <div key={item.label} className="checklist-item" onClick={() => toggleCheck(i)}>
              {item.done
                ? <CheckCircle size={20} style={{ color: 'var(--brand)', flexShrink: 0 }} />
                : <Circle size={20} style={{ color: 'var(--muted)', flexShrink: 0 }} />
              }
              <span style={{ fontSize: '0.9rem', color: item.done ? 'var(--text)' : 'var(--muted)', textDecoration: item.done ? 'none' : 'none', fontWeight: item.done ? '500' : '400' }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CV Upload + Suggested Learning */}
      <div className="dash-two-col" style={{ marginBottom: '24px' }}>
        {/* CV Analysis */}
        <div className="glass-card main-analysis">
          <div className="analysis-header">
            <div className="flex" style={{ gap: '12px' }}>
              <div className="icon-box"><Sparkles size={24} /></div>
              <div>
                <h3 style={{ margin: 0 }}>Your CV Strength</h3>
                <p className="muted" style={{ margin: 0, fontSize: '0.85rem' }}>Upload your CV and SkillBridge will understand your strengths.</p>
              </div>
            </div>
          </div>

          {!isParsing && !showResults && (
            <label style={{ cursor: 'pointer' }}>
              <input type="file" accept=".pdf" style={{ display: 'none' }} onChange={handleFileUpload} />
              <motion.div className="upload-area" whileHover={{ borderColor: 'var(--brand)', background: 'rgba(46,158,77,0.03)' }}>
                <FileText size={48} className="muted" style={{ marginBottom: '16px' }} />
                <p style={{ margin: '0 0 8px', fontWeight: '600' }}>Click to upload your CV (PDF)</p>
                <span className="muted" style={{ fontSize: '0.82rem' }}>SkillBridge will understand your strengths and suggest opportunities</span>
              </motion.div>
            </label>
          )}

          <AnimatePresence>
            {isParsing && (
              <motion.div className="parsing-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="loader-container">
                  <div className="loader-ring"></div>
                  <Sparkles className="loader-icon" size={32} />
                </div>
                <h4>{steps[parsingStep]}</h4>
                <div className="progress-bar-bg">
                  <motion.div className="progress-bar-fill" animate={{ width: `${(parsingStep / steps.length) * 100}%` }} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {showResults && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="results-grid">
                <div>
                  <h4>Your Skills Profile</h4>
                  <p className="muted" style={{ fontSize: '0.85rem', marginBottom: '12px' }}>Skills identified from your CV. Review and update anytime.</p>
                  <div className="chips">
                    {[...analysisData.skills.technical, ...analysisData.skills.soft].slice(0, 10).map(skill => (
                      <span key={skill} className="chip success">{skill}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4>Career opportunities that match your skills</h4>
                  {analysisData.matches.slice(0, 3).map(match => (
                    <div key={match.id} style={{ marginBottom: '16px' }}>
                      <div className="flex" style={{ justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ fontWeight: '500' }}>{match.title}</span>
                        <span style={{ color: match.score > 70 ? 'var(--brand)' : 'var(--muted)', fontWeight: '700' }}>{match.score}%</span>
                      </div>
                      <div className="bar-track"><div className="bar-fill" style={{ width: `${match.score}%` }} /></div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Column */}
        <div style={{ display: 'grid', gap: '20px' }}>
          {/* Ghana Market Insights */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <h4 style={{ marginBottom: '4px' }}>Top Skills Employers Want in Ghana</h4>
            <p className="muted" style={{ fontSize: '0.82rem', marginBottom: '16px' }}>Based on current Ghanaian job listings</p>
            {ghanaMarketInsights.slice(0, 5).map((item, i) => (
              <div key={item.skill} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                  <span style={{ fontWeight: '500' }}>{item.skill}</span>
                  <span style={{ fontWeight: '700', color: 'var(--brand)' }}>{item.demand}%</span>
                </div>
                <div className="bar-track" style={{ height: '5px' }}>
                  <motion.div className="bar-fill"
                    initial={{ width: 0 }} animate={{ width: `${item.demand}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Strength Areas */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <h4 style={{ marginBottom: '4px' }}>Your Strength Areas</h4>
            <p className="muted" style={{ fontSize: '0.82rem', marginBottom: '16px' }}>What makes you stand out</p>
            {dashboardMode === 'personalized' ? (
              <div className="text-center" style={{ padding: '20px 0', opacity: 0.6 }}>
                <p>Upload your CV to identify your core strengths.</p>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {['Communication', 'Teamwork', 'Excel', 'User Research', 'Adaptability', 'Figma'].map(s => (
                    <span key={s} className="strength-chip">{s}</span>
                  ))}
                </div>
                <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(46,158,77,0.05)', borderRadius: '10px', fontSize: '0.82rem', color: 'var(--muted)', lineHeight: '1.5' }}>
                  💼 <strong>Employer feedback:</strong> Employers value your communication skills. Adding more project experience could improve your match rate.
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Opportunity Feed + Mentors */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
        {/* Opportunity Feed */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h4 style={{ marginBottom: '16px' }}>Opportunities Near You</h4>
          {opportunities.map(op => (
            <div key={op.id} className="opportunity-card">
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: `${op.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                {op.tag}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{op.title}</div>
                <div style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>{op.org} · {op.date}</div>
              </div>
              <span className="op-type-badge" style={{ background: `${op.color}15`, color: op.color }}>{op.type}</span>
            </div>
          ))}
        </div>

        {/* Mentor Recommendations */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h4 style={{ marginBottom: '16px' }}>Suggested Mentors</h4>
          {mentors.map(mentor => (
            <div key={mentor.name} className="mentor-card">
              <div className="mentor-avatar">{mentor.avatar}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>{mentor.name}</div>
                <div style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>{mentor.role} at {mentor.company}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--brand)', marginTop: '4px' }}>{mentor.specialty} · {mentor.experience}</div>
              </div>
              <button className={`btn ${mentor.available ? 'primary' : ''}`} style={{ padding: '6px 14px', fontSize: '0.78rem', opacity: mentor.available ? 1 : 0.5 }} disabled={!mentor.available}>
                {mentor.available ? 'Connect' : 'Busy'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* CV Improvement Suggestions */}
      <div className="glass-card" style={{ padding: '24px', marginBottom: '24px' }}>
        <h4 style={{ marginBottom: '4px' }}>Suggestions to Improve Your CV</h4>
        <p className="muted" style={{ fontSize: '0.88rem', marginBottom: '16px' }}>Based on your current profile and the Ghanaian job market</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
          {cvTips.map((tip, i) => (
            <div key={i} style={{ display: 'flex', gap: '10px', padding: '12px', background: 'var(--bg)', borderRadius: '10px', border: '1px solid var(--border)', fontSize: '0.88rem' }}>
              <span style={{ color: 'var(--brand)', fontWeight: '800', flexShrink: 0 }}>→</span>
              <span style={{ color: 'var(--muted)', lineHeight: '1.5' }}>{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── OpportunitiesPanel (embedded as sidebar page) ──────────────────────────
const OpportunitiesPanel = () => (
  <div className="panel-content">
    <div className="panel-header">
      <div>
        <h2>Opportunities</h2>
        <p className="muted">Internships, bootcamps, hackathons, scholarships and events relevant to you.</p>
      </div>
    </div>
    <div style={{ display: 'grid', gap: '16px', maxWidth: '780px' }}>
      {[...opportunities,
        { id: 6, type: 'Internship', title: 'Data Science Intern', org: 'Zeepay', date: 'Closes June 10', tag: '📊', color: '#6B3FA0' },
        { id: 7, type: 'Bootcamp', title: 'AWS Cloud Practitioner', org: 'AWS Ghana', date: 'July 2025', tag: '☁️', color: '#F4A900' },
        { id: 8, type: 'Networking', title: 'iSpace Monthly Meetup', org: 'iSpace Foundation', date: 'Last Friday of every month', tag: '🤝', color: '#2E9E4D' },
      ].map(op => (
        <motion.div key={op.id} whileHover={{ y: -2 }}
          style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', padding: '18px', display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `${op.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', flexShrink: 0 }}>
            {op.tag}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: '700' }}>{op.title}</div>
            <div style={{ color: 'var(--muted)', fontSize: '0.88rem' }}>{op.org} · {op.date}</div>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ padding: '4px 12px', borderRadius: '99px', background: `${op.color}15`, color: op.color, fontSize: '0.78rem', fontWeight: '700' }}>{op.type}</span>
            <button className="btn primary" style={{ padding: '8px 16px', fontSize: '0.82rem' }}>Apply</button>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

// ── Main Dashboard ───────────────────────────────────────────────────────────
const Dashboard = () => {
  const { user, dashboardMode, demoProfile } = useAuth();
  const [activePage, setActivePage] = useState('dashboard');
  const [isParsing, setIsParsing] = useState(false);
  const [parsingStep, setParsingStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [analysisData, setAnalysisData] = useState({ skills: { technical: [], soft: [], operational: [] }, matches: [], gaps: [] });

  const steps = [
    "Understanding your document...",
    "Identifying your technical skills...",
    "Recognising your soft skills...",
    "Matching with the Ghanaian job market...",
    "Preparing your career insights...",
  ];

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsParsing(true); setParsingStep(0);
    try {
      const text = await extractTextFromPDF(file);
      const detected = detectSkills(text);
      const experience = detectExperience(text);
      const matches = calculateJobMatches(detected, experience);
      const gaps = analyzeSkillGap(detected, matches[0]);
      setAnalysisData({ skills: detected, matches, gaps });
    } catch (err) {
      console.error(err);
      setIsParsing(false);
    }
  };

  useEffect(() => {
    if (isParsing && parsingStep < steps.length) {
      const t = setTimeout(() => setParsingStep(p => p + 1), 1200);
      return () => clearTimeout(t);
    } else if (isParsing && parsingStep === steps.length) {
      const t = setTimeout(() => { setIsParsing(false); setShowResults(true); }, 800);
      return () => clearTimeout(t);
    }
  }, [isParsing, parsingStep]);

  const renderPanel = () => {
    switch (activePage) {
      case 'dashboard': return <DashboardHome user={user} analysisData={analysisData} showResults={showResults} isParsing={isParsing} parsingStep={parsingStep} steps={steps} handleFileUpload={handleFileUpload} dashboardMode={dashboardMode} demoProfile={demoProfile} />;
      case 'skills': return <SkillsPanel />;
      case 'matches': return <CareerMatchesPanel />;
      case 'learning': return <LearningPathsPanel />;
      case 'profile': return <ProfilePage embedded />;
      case 'applications': return <ApplicationsPanel />;
      case 'interview': return <MockInterviewPanel />;
      case 'messages': return <MessagesPanel />;
      case 'chatbot': return <AskSkillBridgePage />;
      case 'opportunities': return <OpportunitiesPanel />;
      case 'settings': return <SettingsPanel />;
      default: return <DashboardHome user={user} analysisData={analysisData} showResults={showResults} isParsing={isParsing} parsingStep={parsingStep} steps={steps} handleFileUpload={handleFileUpload} dashboardMode={dashboardMode} demoProfile={demoProfile} />;
    }
  };

  return (
    <DashboardLayout activePage={activePage} onNavigate={setActivePage}>
      {renderPanel()}
    </DashboardLayout>
  );
};

export default Dashboard;
