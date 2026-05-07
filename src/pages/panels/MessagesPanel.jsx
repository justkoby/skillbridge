import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { mockMessages } from '../../data/ghanaianData';

const typeColor = { recruiter: '#4F7CFF', mentor: 'var(--brand)', support: 'var(--muted)' };

const MessagesPanel = () => {
  const [selected, setSelected] = useState(mockMessages[0]);
  const [reply, setReply] = useState('');

  const mockChat = [
    { from: 'them', text: selected.lastMessage, time: selected.time },
    { from: 'me', text: 'Thank you for reaching out! I\'d love to learn more about the opportunity.', time: 'Now' },
  ];

  return (
    <div className="panel-content" style={{ padding: 0 }}>
      <div className="messages-layout">
        {/* Inbox */}
        <div className="inbox-list">
          <div style={{ padding: '24px 20px 16px', borderBottom: '1px solid var(--border)' }}>
            <h3 style={{ margin: 0 }}>Messages</h3>
          </div>
          {mockMessages.map(msg => (
            <div key={msg.id}
              className={`inbox-item ${selected?.id === msg.id ? 'active' : ''}`}
              onClick={() => setSelected(msg)}>
              <div className="inbox-avatar" style={{ background: typeColor[msg.type] }}>
                {msg.avatar}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{msg.sender}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{msg.time}</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '2px' }}>{msg.role}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--muted)', marginTop: '4px',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {msg.lastMessage}
                </div>
              </div>
              {msg.unread > 0 && (
                <div className="unread-badge">{msg.unread}</div>
              )}
            </div>
          ))}
        </div>

        {/* Chat Area */}
        <div className="chat-area">
          {selected && (
            <>
              <div className="chat-header">
                <div className="inbox-avatar" style={{ background: typeColor[selected.type] }}>
                  {selected.avatar}
                </div>
                <div>
                  <div style={{ fontWeight: '700' }}>{selected.sender}</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>{selected.role}</div>
                </div>
              </div>

              <div className="chat-messages">
                {mockChat.map((msg, i) => (
                  <div key={i} className={`chat-bubble ${msg.from === 'me' ? 'mine' : 'theirs'}`}>
                    <div className="bubble-text">{msg.text}</div>
                    <div className="bubble-time">{msg.time}</div>
                  </div>
                ))}
              </div>

              <div className="chat-input-row">
                <input
                  className="chat-input"
                  placeholder="Type a message..."
                  value={reply}
                  onChange={e => setReply(e.target.value)}
                />
                <button className="btn primary" style={{ padding: '12px 20px' }}>
                  <Send size={18} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPanel;
