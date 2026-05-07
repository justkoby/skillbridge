import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Briefcase } from 'lucide-react';
import { universities } from '../../data/ghanaianData';

const PostJobPanel = ({ onPost }) => {
  const [form, setForm] = useState({
    title: '', company: '', location: 'Accra, Ghana',
    type: 'Graduate Internship', skills: '',
    level: 'Entry-Level', education: 'Bachelor\'s Degree',
    description: '', remote: false, paid: false, training: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); if (onPost) onPost(form); }, 2000);
  };

  return (
    <div className="panel-content">
      <div className="panel-header">
        <div>
          <h2>Post a Job</h2>
          <p className="muted">Find the right talent for your team. Keep it simple and clear.</p>
        </div>
      </div>

      {submitted ? (
        <motion.div className="success-banner" initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
          <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🎉</div>
          <h3>Opportunity Published!</h3>
          <p className="muted">Your job listing is now live. SkillBridge will match it with top candidates.</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="post-job-form">
          <div className="form-section">
            <h4 className="form-section-title">Basic Information</h4>
            <div className="form-row-2">
              <div className="form-field">
                <label className="form-label">Job Title *</label>
                <input className="form-input" style={{ paddingLeft: '16px' }} placeholder="e.g. UI/UX Design Intern"
                  value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
              </div>
              <div className="form-field">
                <label className="form-label">Company *</label>
                <input className="form-input" style={{ paddingLeft: '16px' }} placeholder="e.g. Hubtel"
                  value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} required />
              </div>
            </div>
            <div className="form-row-2">
              <div className="form-field">
                <label className="form-label">Location</label>
                <input className="form-input" style={{ paddingLeft: '16px' }}
                  value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
              </div>
              <div className="form-field">
                <label className="form-label">Employment Type</label>
                <select className="form-input" style={{ paddingLeft: '16px' }}
                  value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                  <option>Graduate Internship</option>
                  <option>National Service</option>
                  <option>Entry-Level</option>
                  <option>Student Attachment</option>
                  <option>Part-Time</option>
                  <option>Contract</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h4 className="form-section-title">Requirements</h4>
            <div className="form-row-2">
              <div className="form-field">
                <label className="form-label">Experience Level</label>
                <select className="form-input" style={{ paddingLeft: '16px' }}
                  value={form.level} onChange={e => setForm({ ...form, level: e.target.value })}>
                  <option>No Experience Needed</option>
                  <option>Entry-Level</option>
                  <option>1-2 Years</option>
                  <option>3-5 Years</option>
                </select>
              </div>
              <div className="form-field">
                <label className="form-label">Education</label>
                <select className="form-input" style={{ paddingLeft: '16px' }}
                  value={form.education} onChange={e => setForm({ ...form, education: e.target.value })}>
                  <option>HND or equivalent</option>
                  <option>Bachelor's Degree</option>
                  <option>Master's Degree</option>
                  <option>Any qualification</option>
                </select>
              </div>
            </div>
            <div className="form-field">
              <label className="form-label">Skills Required (comma-separated)</label>
              <input className="form-input" style={{ paddingLeft: '16px' }} placeholder="e.g. Figma, User Research, Prototyping"
                value={form.skills} onChange={e => setForm({ ...form, skills: e.target.value })} />
            </div>
          </div>

          <div className="form-section">
            <h4 className="form-section-title">Description</h4>
            <div className="form-field">
              <label className="form-label">Job Description</label>
              <textarea className="form-input" style={{ paddingLeft: '16px', minHeight: '140px', resize: 'vertical' }}
                placeholder="Describe the role, responsibilities, and what you're looking for..."
                value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
            </div>
          </div>

          <div className="form-section">
            <h4 className="form-section-title">Benefits (Optional)</h4>
            <div className="benefits-grid">
              {[['remote', 'Remote / Hybrid'], ['paid', 'Paid Position'], ['training', 'Training Included']].map(([key, label]) => (
                <label key={key} className="benefit-toggle">
                  <input type="checkbox" checked={form[key]} onChange={e => setForm({ ...form, [key]: e.target.checked })} />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>

          <button type="submit" className="btn primary" style={{ width: '100%', padding: '16px', fontSize: '1rem' }}>
            Publish Opportunity
          </button>
        </form>
      )}
    </div>
  );
};

export default PostJobPanel;
