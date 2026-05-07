import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Mail, MapPin, Phone, GraduationCap, Briefcase, Award, Link, TrendingUp, Upload } from 'lucide-react';
import { universities } from '../data/ghanaianData';

const technicalSkills = [
  { name: 'Figma', level: 85 },
  { name: 'Adobe XD', level: 70 },
  { name: 'HTML & CSS', level: 75 },
  { name: 'JavaScript', level: 55 },
  { name: 'Microsoft Excel', level: 90 },
  { name: 'User Research', level: 80 },
];

const cvSuggestions = [
  'Add measurable achievements to your experience section.',
  'Include a link to your portfolio or GitHub.',
  'Expand your project descriptions with impact metrics.',
  'Add certifications to strengthen your profile.',
];

const ProfilePage = ({ embedded }) => {
  const { user } = useAuth();
  const [cvStrength] = useState(72);
  const [activeTab, setActiveTab] = useState('about');

  const firstName = user?.name?.split(' ')[0] || 'Kwame';
  const lastName = user?.name?.split(' ')[1] || 'Asare';
  const initials = `${firstName[0]}${lastName[0]}`.toUpperCase();

  const content = (
    <div className={embedded ? '' : 'main'} style={embedded ? {} : { padding: '40px 0' }}>
      <div className={embedded ? '' : 'container'}>

        {/* Hero Profile Card */}
        <motion.div
          className="glass-card profile-hero"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: '24px' }}
        >
          <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div className="profile-avatar-lg">{initials}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h2 style={{ margin: '0 0 4px' }}>{user?.name || 'Kwame Asare'}</h2>
                  <div style={{ color: 'var(--brand)', fontWeight: '600', marginBottom: '8px' }}>
                    Aspiring Product Designer
                  </div>
                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', color: 'var(--muted)', fontSize: '0.88rem' }}>
                    <span><MapPin size={14} style={{ display: 'inline' }} /> Accra, Ghana</span>
                    <span><GraduationCap size={14} style={{ display: 'inline' }} /> University of Ghana, Legon</span>
                    <span><Mail size={14} style={{ display: 'inline' }} /> {user?.email}</span>
                  </div>
                </div>

                {/* CV Strength Meter */}
                <div className="cv-strength-card">
                  <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginBottom: '8px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Your CV Strength
                  </div>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <svg viewBox="0 0 60 60" width="60" height="60">
                      <circle cx="30" cy="30" r="24" fill="none" stroke="var(--border)" strokeWidth="5" />
                      <circle cx="30" cy="30" r="24" fill="none" stroke="var(--brand)" strokeWidth="5"
                        strokeDasharray={`${2 * Math.PI * 24 * cvStrength / 100} ${2 * Math.PI * 24}`}
                        strokeLinecap="round" transform="rotate(-90 30 30)" />
                    </svg>
                    <div>
                      <div style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--brand)' }}>{cvStrength}%</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>Career ready</div>
                    </div>
                  </div>
                  <div style={{ marginTop: '8px' }}>
                    {cvSuggestions.slice(0, 2).map(s => (
                      <div key={s} style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '4px', display: 'flex', gap: '6px' }}>
                        <span style={{ color: '#F4A900' }}>→</span> {s}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
                <span className="profile-badge ready">✓ Ready for Internship</span>
                <span className="profile-badge ns">National Service Eligible</span>
                <span className="profile-badge open">Open to Opportunities</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="tab-row" style={{ marginBottom: '24px' }}>
          {['about', 'education', 'skills', 'experience', 'certifications', 'projects'].map(tab => (
            <button key={tab} className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
              style={{ textTransform: 'capitalize' }}>
              {tab}
            </button>
          ))}
        </div>

        <div className="profile-tab-content">
          {activeTab === 'about' && (
            <div className="glass-card" style={{ marginBottom: '20px' }}>
              <h4>About Me</h4>
              <p style={{ color: 'var(--muted)', lineHeight: '1.7' }}>
                A passionate and detail-oriented final-year student at the University of Ghana, studying Information Technology.
                I am driven by the challenge of creating user-centred digital products that solve real-world problems for Ghanaians.
                With experience in UI/UX design and a strong foundation in data analysis, I am ready for internship and entry-level opportunities.
              </p>
              {/* Career Insights */}
              <div className="insight-box" style={{ marginTop: '20px' }}>
                <TrendingUp size={18} style={{ color: 'var(--brand)', flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: '700', marginBottom: '6px' }}>Career Insights</div>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--muted)' }}>
                    Your profile is strong for <strong>Frontend roles</strong> and <strong>UI/UX internships</strong>.
                    To improve, consider gaining more <strong>teamwork project experience</strong> and developing your <strong>presentation skills</strong>.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'education' && (
            <div className="glass-card">
              <h4 style={{ marginBottom: '24px' }}>Education</h4>
              {[
                { degree: 'BSc. Information Technology', school: 'University of Ghana, Legon', year: '2021 – 2025', gpa: 'GPA: 3.6 / 4.0' },
                { degree: 'WASSCE (Science)', school: 'Prempeh College, Kumasi', year: '2018 – 2021', gpa: 'Aggregate 8' },
              ].map((edu, i) => (
                <div key={i} style={{ display: 'flex', gap: '16px', marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ width: '44px', height: '44px', background: 'rgba(46,158,77,0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <GraduationCap size={22} style={{ color: 'var(--brand)' }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: '700' }}>{edu.degree}</div>
                    <div style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>{edu.school}</div>
                    <div style={{ color: 'var(--muted)', fontSize: '0.82rem', marginTop: '4px' }}>{edu.year} · {edu.gpa}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="glass-card">
              <h4 style={{ marginBottom: '8px' }}>Your Skills Profile</h4>
              <p className="muted" style={{ fontSize: '0.88rem', marginBottom: '24px' }}>
                These skills were identified from your CV and profile. You can review and update them anytime.
              </p>
              <div style={{ display: 'grid', gap: '16px' }}>
                {technicalSkills.map(skill => (
                  <div key={skill.name}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontWeight: '500' }}>{skill.name}</span>
                      <span style={{ fontWeight: '700', color: 'var(--brand)' }}>{skill.level}%</span>
                    </div>
                    <div className="bar-track">
                      <motion.div className="bar-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 0.8 }}
                        style={{ background: skill.level >= 80 ? 'var(--brand)' : skill.level >= 60 ? '#F4A900' : '#ef4444' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '24px' }}>
                <h5 style={{ marginBottom: '12px' }}>Soft Skills</h5>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {['Communication', 'Teamwork', 'Problem Solving', 'Critical Thinking', 'Time Management', 'Leadership'].map(s => (
                    <span key={s} className="chip success">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'experience' && (
            <div className="glass-card">
              <h4 style={{ marginBottom: '24px' }}>Experience</h4>
              {[
                { role: 'UI/UX Design Intern', org: 'Hubtel · Accra', period: 'Jun – Sep 2024', desc: 'Designed and prototyped user interfaces for Hubtel\'s payment platform, improving user task completion rate by 18%.' },
                { role: 'National Service (IT)', org: 'Ghana Revenue Authority', period: 'Oct 2024 – Present', desc: 'Supporting IT infrastructure and developing internal data tracking tools using Excel and Power BI.' },
              ].map((exp, i) => (
                <div key={i} style={{ display: 'flex', gap: '16px', marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ width: '44px', height: '44px', background: 'rgba(79,124,255,0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Briefcase size={22} style={{ color: '#4F7CFF' }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: '700' }}>{exp.role}</div>
                    <div style={{ color: 'var(--muted)', fontSize: '0.88rem' }}>{exp.org} · {exp.period}</div>
                    <p style={{ margin: '8px 0 0', fontSize: '0.88rem', color: 'var(--muted)', lineHeight: '1.6' }}>{exp.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'certifications' && (
            <div className="glass-card">
              <h4 style={{ marginBottom: '24px' }}>Certifications</h4>
              {[
                { name: 'Google UX Design Certificate', issuer: 'Google / Coursera', year: '2024' },
                { name: 'Figma UI Design Essentials', issuer: 'Udemy', year: '2023' },
                { name: 'Excel for Business', issuer: 'Macquarie University / Coursera', year: '2023' },
              ].map((cert, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '14px 0', borderBottom: '1px solid var(--border)' }}>
                  <Award size={20} style={{ color: '#F4A900', flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '600' }}>{cert.name}</div>
                    <div style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>{cert.issuer} · {cert.year}</div>
                  </div>
                  <button className="btn" style={{ padding: '6px 14px', fontSize: '0.82rem' }}>
                    <Upload size={13} /> Upload
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'projects' && (
            <div style={{ display: 'grid', gap: '16px' }}>
              {[
                { name: 'SkillBridge UI Redesign', desc: 'Redesigned the onboarding flow for a career platform, increasing sign-up conversion by 32%.', tags: ['Figma', 'UX Research'], links: ['Behance', 'Prototype'] },
                { name: 'GhanaTrack Data Dashboard', desc: 'Built a Power BI dashboard for tracking national service officer data across 10 regions.', tags: ['Power BI', 'Excel', 'SQL'], links: ['GitHub'] },
              ].map((proj, i) => (
                <div key={i} className="glass-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <h4 style={{ margin: 0 }}>{proj.name}</h4>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {proj.links.map(l => (
                        <span key={l} style={{ fontSize: '0.78rem', padding: '3px 10px', borderRadius: '99px', background: 'rgba(79,124,255,0.08)', color: '#4F7CFF', cursor: 'pointer' }}>
                          <Link size={11} style={{ display: 'inline', marginRight: '4px' }} />{l}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p style={{ margin: '0 0 12px', color: 'var(--muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>{proj.desc}</p>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {proj.tags.map(t => <span key={t} className="chip success">{t}</span>)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return content;
};

export default ProfilePage;
