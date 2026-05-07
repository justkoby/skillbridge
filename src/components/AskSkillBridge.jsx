import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, ChevronRight } from 'lucide-react';
import { generateResponse } from '../services/chatbotService';
import { useAuth } from '../context/AuthContext';

const JobCard = ({ job }) => (
  <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '10px', padding: '12px', marginBottom: '8px' }}>
    <div style={{ fontWeight: '700', fontSize: '0.88rem' }}>{job.title}</div>
    <div style={{ color: 'var(--brand)', fontSize: '0.8rem', fontWeight: '600' }}>{job.company}</div>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '0.78rem', color: 'var(--muted)' }}>
      <span>{job.type}</span>
      <span style={{ color: job.match >= 80 ? 'var(--brand)' : '#F4A900', fontWeight: '700' }}>{job.match}% match</span>
    </div>
  </div>
);

const CandidateCard = ({ c }) => (
  <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '10px', padding: '12px', marginBottom: '8px', display: 'flex', gap: '10px', alignItems: 'center' }}>
    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--brand)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.78rem', flexShrink: 0 }}>{c.avatar}</div>
    <div style={{ flex: 1 }}>
      <div style={{ fontWeight: '700', fontSize: '0.88rem' }}>{c.name}</div>
      <div style={{ color: 'var(--muted)', fontSize: '0.78rem' }}>{c.role}</div>
    </div>
    <div style={{ fontWeight: '800', color: 'var(--brand)', fontSize: '0.88rem' }}>{c.match}%</div>
  </div>
);

const CompanyCard = ({ co }) => (
  <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '10px', padding: '14px', marginTop: '8px' }}>
    <div style={{ fontWeight: '700', marginBottom: '4px' }}>{co.name}</div>
    <div style={{ color: 'var(--brand)', fontSize: '0.8rem', marginBottom: '8px' }}>{co.industry}</div>
    <p style={{ margin: '0 0 10px', fontSize: '0.82rem', color: 'var(--muted)', lineHeight: '1.5' }}>{co.about}</p>
    <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginBottom: '6px', fontWeight: '600' }}>Open Roles:</div>
    {co.openRoles.map(r => (
      <div key={r} style={{ fontSize: '0.78rem', color: 'var(--text)', padding: '3px 0', display: 'flex', gap: '6px' }}>
        <span style={{ color: 'var(--brand)' }}>•</span>{r}
      </div>
    ))}
  </div>
);

const LearningCard = ({ track }) => (
  <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '10px', padding: '12px', marginBottom: '8px', display: 'flex', gap: '10px', alignItems: 'center' }}>
    <span style={{ fontSize: '1.4rem' }}>{track.icon}</span>
    <div style={{ flex: 1 }}>
      <div style={{ fontWeight: '600', fontSize: '0.88rem' }}>{track.title}</div>
      <div style={{ color: 'var(--muted)', fontSize: '0.78rem' }}>{track.duration} · {track.modules} modules</div>
    </div>
    <div style={{ fontWeight: '700', color: track.color, fontSize: '0.82rem' }}>{track.matchScore}%</div>
  </div>
);

const MarketInsightsCard = ({ data }) => (
  <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '10px', padding: '14px', marginTop: '8px' }}>
    {data.map((item, i) => (
      <div key={i} style={{ marginBottom: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
          <span style={{ fontWeight: '500' }}>{item.skill}</span>
          <span style={{ fontWeight: '700', color: 'var(--brand)' }}>{item.demand}%</span>
        </div>
        <div style={{ height: '5px', background: 'var(--border)', borderRadius: '3px', overflow: 'hidden' }}>
          <div style={{ width: `${item.demand}%`, height: '100%', background: 'var(--brand)', borderRadius: '3px' }} />
        </div>
      </div>
    ))}
  </div>
);

const InterviewCard = ({ items }) => (
  <div style={{ marginTop: '8px' }}>
    {items.map((item, i) => (
      <div key={i} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '10px', padding: '12px', marginBottom: '8px' }}>
        <div style={{ fontWeight: '600', fontSize: '0.88rem', marginBottom: '6px' }}>"{item.q}"</div>
        <div style={{ fontSize: '0.78rem', color: 'var(--muted)', lineHeight: '1.5' }}>💡 {item.tip}</div>
      </div>
    ))}
  </div>
);

const CVTipsCard = ({ tips }) => (
  <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '10px', padding: '14px', marginTop: '8px' }}>
    {tips.map((tip, i) => (
      <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '8px', fontSize: '0.82rem' }}>
        <span style={{ color: 'var(--brand)', fontWeight: '700', flexShrink: 0 }}>→</span>
        <span style={{ color: 'var(--muted)', lineHeight: '1.5' }}>{tip}</span>
      </div>
    ))}
  </div>
);

const renderResponseData = (response) => {
  if (!response.data) return null;
  switch (response.type) {
    case 'jobs': return response.data.map(j => <JobCard key={j.id} job={j} />);
    case 'candidates': return response.data.map(c => <CandidateCard key={c.name} c={c} />);
    case 'company': return <CompanyCard co={response.data} />;
    case 'learning': return response.data.map(t => <LearningCard key={t.id} track={t} />);
    case 'market-insights': return <MarketInsightsCard data={response.data} />;
    case 'interview': return <InterviewCard items={response.data} />;
    case 'cv-tips': return <CVTipsCard tips={response.data} />;
    case 'employer-insight': return (
      <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '10px', padding: '14px', marginTop: '8px' }}>
        {response.data.map((insight, i) => (
          <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '8px', fontSize: '0.82rem' }}>
            <span style={{ color: 'var(--brand)', fontWeight: '700' }}>•</span>
            <span style={{ color: 'var(--muted)' }}>{insight}</span>
          </div>
        ))}
      </div>
    );
    case 'applications': return response.data.map(a => (
      <div key={a.id} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '10px', padding: '12px', marginBottom: '8px' }}>
        <div style={{ fontWeight: '700', fontSize: '0.88rem' }}>{a.role}</div>
        <div style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>{a.company} · {a.appliedDate}</div>
        <div style={{ color: 'var(--brand)', fontSize: '0.78rem', fontWeight: '600', marginTop: '4px' }}>{a.status}</div>
      </div>
    ));
    default: return null;
  }
};

const defaultSuggestions = {
  jobseeker: ['Find internships in Accra', 'Improve my CV', 'What careers fit my skills?', 'Tell me about Hubtel', 'Recommend learning paths'],
  employer: ['Find frontend candidates', 'Show top matches', 'Which candidates have Excel skills?', 'Hiring insights'],
};

const AskSkillBridge = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: `Hi${user?.name ? ` ${user.name.split(' ')[0]}` : ''}! 👋 I'm SkillBridge Assistant. Ask me anything about internships, your CV, learning paths, or companies hiring in Ghana.`,
      suggestions: defaultSuggestions[user?.role === 'employer' ? 'employer' : 'jobseeker'],
    }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const role = user?.role || 'jobseeker';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const send = (text) => {
    const msg = text || input;
    if (!msg.trim()) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: msg }]);
    setTyping(true);

    setTimeout(() => {
      const response = generateResponse(msg, role);
      setMessages(prev => [...prev, { role: 'bot', ...response }]);
      setTyping(false);
    }, 900 + Math.random() * 600);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <>
      {/* Floating Bubble */}
      <motion.button
        className="chat-bubble-btn"
        onClick={() => { setOpen(o => !o); setTimeout(() => inputRef.current?.focus(), 300); }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {open
            ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}><X size={22} /></motion.span>
            : <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}><MessageSquare size={22} /></motion.span>
          }
        </AnimatePresence>
        {!open && <span className="chat-unread-dot" />}
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="chat-panel"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20 }}
          >
            {/* Header */}
            <div className="chat-panel-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div className="chat-panel-avatar"><Sparkles size={16} /></div>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>Ask SkillBridge</div>
                  <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)' }}>Career Support Assistant · Online</div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', opacity: 0.7 }}>
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="chat-panel-messages">
              {messages.map((msg, i) => (
                <div key={i} className={`chat-panel-msg ${msg.role}`}>
                  {msg.role === 'bot' && (
                    <div className="bot-icon-sm"><Sparkles size={12} /></div>
                  )}
                  <div className={`chat-panel-bubble ${msg.role}`}>
                    {msg.text}
                    {msg.role === 'bot' && msg.data && renderResponseData(msg)}
                    {msg.role === 'bot' && msg.suggestions && (
                      <div className="chat-suggestions">
                        {msg.suggestions.slice(0, 3).map(s => (
                          <button key={s} className="chat-suggestion-pill" onClick={() => send(s)}>
                            {s} <ChevronRight size={12} />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="chat-panel-msg bot">
                  <div className="bot-icon-sm"><Sparkles size={12} /></div>
                  <div className="chat-panel-bubble bot">
                    <div className="typing-dots">
                      <span /><span /><span />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="chat-panel-input-row">
              <input
                ref={inputRef}
                className="chat-panel-input"
                placeholder="Ask about internships, CV, companies..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
              />
              <button className="chat-panel-send" onClick={() => send()} disabled={!input.trim()}>
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AskSkillBridge;
