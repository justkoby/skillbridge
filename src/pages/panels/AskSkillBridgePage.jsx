import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, Sparkles, ChevronRight } from 'lucide-react';
import { generateResponse } from '../../services/chatbotService';
import { useAuth } from '../../context/AuthContext';

const defaultSuggestions = {
  jobseeker: [
    'Find internships in Accra',
    'Improve my CV',
    'What careers fit my skills?',
    'Tell me about Hubtel',
    'Recommend learning paths',
    'What skills do employers want?',
    'Prepare for interview',
  ],
  employer: [
    'Find frontend candidates',
    'Show top matches',
    'Which candidates have Excel skills?',
    'Hiring insights for Ghana',
    'Improve my job post',
    'Find internship-ready candidates',
  ],
};

const AskSkillBridgePage = () => {
  const { user } = useAuth();
  const role = user?.role || 'jobseeker';
  const [messages, setMessages] = useState([{
    role: 'bot',
    text: `Welcome to Ask SkillBridge! 🌟\n\nI'm your career support assistant. I can help you find ${role === 'employer' ? 'top candidates, review job posts, and get hiring insights' : 'internships, improve your CV, discover learning paths, and learn about top companies in Ghana'}.\n\nWhat would you like to explore?`,
    suggestions: defaultSuggestions[role],
  }]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);

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
    }, 900 + Math.random() * 500);
  };

  const renderData = (msg) => {
    if (!msg.data) return null;
    if (msg.type === 'jobs') return msg.data.slice(0, 4).map(j => (
      <div key={j.id} style={dataCardStyle}>
        <div style={{ fontWeight: '700' }}>{j.title}</div>
        <div style={{ color: 'var(--brand)', fontSize: '0.85rem' }}>{j.company} · {j.type}</div>
        <div style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>{j.location} · {j.match}% match</div>
      </div>
    ));
    if (msg.type === 'candidates') return msg.data.slice(0, 4).map(c => (
      <div key={c.name} style={{ ...dataCardStyle, display: 'flex', gap: '12px', alignItems: 'center' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--brand)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.82rem', flexShrink: 0 }}>{c.avatar}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: '700' }}>{c.name}</div>
          <div style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>{c.role} · {c.match}% match</div>
        </div>
      </div>
    ));
    if (msg.type === 'cv-tips') return msg.data.map((tip, i) => (
      <div key={i} style={{ ...dataCardStyle, display: 'flex', gap: '8px', padding: '10px 14px' }}>
        <span style={{ color: 'var(--brand)', fontWeight: '700' }}>→</span>
        <span style={{ fontSize: '0.88rem', color: 'var(--muted)' }}>{tip}</span>
      </div>
    ));
    if (msg.type === 'market-insights') return msg.data.map((item, i) => (
      <div key={i} style={{ marginBottom: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '4px' }}>
          <span style={{ fontWeight: '500' }}>{item.skill}</span>
          <span style={{ fontWeight: '700', color: 'var(--brand)' }}>{item.demand}%</span>
        </div>
        <div style={{ height: '5px', background: 'var(--border)', borderRadius: '3px', overflow: 'hidden' }}>
          <div style={{ width: `${item.demand}%`, height: '100%', background: 'var(--brand)', borderRadius: '3px' }} />
        </div>
      </div>
    ));
    if (msg.type === 'company') {
      const co = msg.data;
      return (
        <div style={dataCardStyle}>
          <div style={{ fontWeight: '700', fontSize: '1rem', marginBottom: '4px' }}>{co.name}</div>
          <div style={{ color: 'var(--brand)', fontSize: '0.85rem', marginBottom: '8px' }}>{co.industry}</div>
          <p style={{ margin: '0 0 10px', fontSize: '0.88rem', color: 'var(--muted)' }}>{co.about}</p>
          <div style={{ fontSize: '0.82rem', fontWeight: '600', marginBottom: '6px' }}>Open roles:</div>
          {co.openRoles.map(r => <div key={r} style={{ fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '3px' }}>• {r}</div>)}
        </div>
      );
    }
    if (msg.type === 'interview') return msg.data.map((item, i) => (
      <div key={i} style={dataCardStyle}>
        <div style={{ fontWeight: '600', fontSize: '0.88rem', marginBottom: '6px' }}>"{item.q}"</div>
        <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>💡 {item.tip}</div>
      </div>
    ));
    if (msg.type === 'employer-insight') return msg.data.map((insight, i) => (
      <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
        <span style={{ color: 'var(--brand)', fontWeight: '700' }}>•</span>
        <span style={{ fontSize: '0.88rem', color: 'var(--muted)' }}>{insight}</span>
      </div>
    ));
    return null;
  };

  const dataCardStyle = {
    background: 'var(--bg)',
    border: '1px solid var(--border)',
    borderRadius: '10px',
    padding: '12px 14px',
    marginTop: '8px',
    fontSize: '0.9rem',
  };

  return (
    <div className="panel-content" style={{ padding: 0, height: 'calc(100vh - 70px)', display: 'flex' }}>
      {/* Chat Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, var(--brand), var(--brand-2))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles size={20} style={{ color: 'white' }} />
          </div>
          <div>
            <h3 style={{ margin: 0 }}>Ask SkillBridge</h3>
            <p className="muted" style={{ margin: 0, fontSize: '0.82rem' }}>Your career support assistant</p>
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start', gap: '8px' }}>
              <div style={{
                maxWidth: '75%', padding: '14px 18px', borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                background: msg.role === 'user' ? 'var(--brand)' : 'var(--surface)',
                color: msg.role === 'user' ? 'white' : 'var(--text)',
                border: msg.role === 'bot' ? '1px solid var(--border)' : 'none',
                fontSize: '0.92rem', lineHeight: '1.6',
                whiteSpace: 'pre-line',
              }}>
                {msg.text}
                {msg.role === 'bot' && msg.data && <div style={{ marginTop: '12px' }}>{renderData(msg)}</div>}
                {msg.role === 'bot' && msg.suggestions && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '12px' }}>
                    {msg.suggestions.slice(0, 4).map(s => (
                      <button key={s} onClick={() => send(s)} style={{
                        padding: '6px 12px', border: '1px solid var(--border)', borderRadius: '99px',
                        background: 'var(--bg)', color: 'var(--brand)', fontSize: '0.78rem',
                        cursor: 'pointer', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px',
                      }}>
                        {s} <ChevronRight size={11} />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {typing && (
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <div style={{ padding: '12px 16px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '18px 18px 18px 4px' }}>
                <div className="typing-dots"><span /><span /><span /></div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div style={{ padding: '16px 28px', borderTop: '1px solid var(--border)', display: 'flex', gap: '10px' }}>
          <input
            style={{ flex: 1, padding: '14px 18px', border: '1px solid var(--border)', borderRadius: '12px', background: 'var(--bg)', color: 'var(--text)', fontSize: '0.9rem' }}
            placeholder="Ask about internships, your CV, companies..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
          />
          <button className="btn primary" style={{ padding: '14px 20px' }} onClick={() => send()}>
            <Send size={18} />
          </button>
        </div>
      </div>

      {/* Suggested Prompts Sidebar */}
      <div style={{ width: '280px', borderLeft: '1px solid var(--border)', padding: '24px', overflowY: 'auto' }}>
        <h4 style={{ marginBottom: '16px', color: 'var(--muted)', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Suggested Prompts</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {defaultSuggestions[role].map(prompt => (
            <button key={prompt} onClick={() => send(prompt)} style={{
              padding: '10px 14px', border: '1px solid var(--border)', borderRadius: '10px',
              background: 'transparent', color: 'var(--text)', fontSize: '0.86rem',
              cursor: 'pointer', textAlign: 'left', transition: '0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--brand)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              {prompt}
            </button>
          ))}
        </div>

        <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(46,158,77,0.05)', border: '1px solid var(--brand-light)', borderRadius: '12px' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--brand)', marginBottom: '6px' }}>💡 Try asking:</div>
          <div style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: '1.6' }}>
            {role === 'employer'
              ? '"Find candidates with Figma experience" or "What skills are missing from my applicants?"'
              : '"Tell me about Hubtel" or "What jobs match my skills in Accra?"'
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default AskSkillBridgePage;
