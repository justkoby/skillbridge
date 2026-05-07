import React, { useState } from 'react';
import ThemeToggle from '../../components/ThemeToggle';
import { useAuth } from '../../context/AuthContext';
import { Bell, Lock, Shield, Link, User } from 'lucide-react';

const SettingsPanel = () => {
  const { user } = useAuth();
  const [notif, setNotif] = useState({ jobAlerts: true, matchUpdates: true, messages: true, newsletter: false });

  return (
    <div className="panel-content">
      <div className="panel-header">
        <div>
          <h2>Settings</h2>
          <p className="muted">Manage your account preferences and privacy.</p>
        </div>
      </div>

      <div className="settings-grid">
        {/* Account */}
        <div className="settings-card">
          <div className="settings-section-title"><User size={18} /> Account</div>
          <div className="settings-field">
            <label>Full Name</label>
            <input className="form-input" defaultValue={user?.name || 'Kwame Asare'} style={{ paddingLeft: '16px' }} />
          </div>
          <div className="settings-field">
            <label>Email Address</label>
            <input className="form-input" defaultValue={user?.email || ''} style={{ paddingLeft: '16px' }} />
          </div>
          <div className="settings-field">
            <label>Location</label>
            <input className="form-input" defaultValue="Accra, Ghana" style={{ paddingLeft: '16px' }} />
          </div>
          <button className="btn primary" style={{ marginTop: '8px' }}>Save Changes</button>
        </div>

        {/* Notifications */}
        <div className="settings-card">
          <div className="settings-section-title"><Bell size={18} /> Notifications</div>
          {Object.entries(notif).map(([key, val]) => (
            <div key={key} className="settings-toggle-row">
              <div>
                <div style={{ fontWeight: '500', textTransform: 'capitalize' }}>
                  {key.replace(/([A-Z])/g, ' $1')}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>
                  {key === 'jobAlerts' && 'Get notified when new matching jobs are posted'}
                  {key === 'matchUpdates' && 'Updates when your match score changes'}
                  {key === 'messages' && 'New messages from recruiters and mentors'}
                  {key === 'newsletter' && 'Weekly career tips and insights'}
                </div>
              </div>
              <div
                className={`toggle-switch ${val ? 'on' : ''}`}
                onClick={() => setNotif(prev => ({ ...prev, [key]: !prev[key] }))}
              />
            </div>
          ))}
        </div>

        {/* Password */}
        <div className="settings-card">
          <div className="settings-section-title"><Lock size={18} /> Password</div>
          <div className="settings-field">
            <label>Current Password</label>
            <input className="form-input" type="password" placeholder="••••••••" style={{ paddingLeft: '16px' }} />
          </div>
          <div className="settings-field">
            <label>New Password</label>
            <input className="form-input" type="password" placeholder="••••••••" style={{ paddingLeft: '16px' }} />
          </div>
          <div className="settings-field">
            <label>Confirm New Password</label>
            <input className="form-input" type="password" placeholder="••••••••" style={{ paddingLeft: '16px' }} />
          </div>
          <button className="btn primary" style={{ marginTop: '8px' }}>Update Password</button>
        </div>

        {/* Appearance */}
        <div className="settings-card">
          <div className="settings-section-title"><Shield size={18} /> Appearance & Privacy</div>
          <div className="settings-toggle-row">
            <div>
              <div style={{ fontWeight: '500' }}>Dark Mode</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>Switch between light and dark theme</div>
            </div>
            <ThemeToggle />
          </div>
          <div className="settings-toggle-row">
            <div>
              <div style={{ fontWeight: '500' }}>Profile Visibility</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>Allow employers to find your profile</div>
            </div>
            <div className="toggle-switch on" />
          </div>
          <div className="settings-toggle-row">
            <div>
              <div style={{ fontWeight: '500' }}>Show CV Strength Score</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>Display your readiness score to recruiters</div>
            </div>
            <div className="toggle-switch on" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
