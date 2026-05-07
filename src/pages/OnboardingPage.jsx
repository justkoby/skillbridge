import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CheckCircle, Briefcase, GraduationCap, Star, Target, UploadCloud, Building2, Users } from 'lucide-react';

const OnboardingPage = () => {
  const { user, completeOnboarding } = useAuth();
  const navigate = useNavigate();
  const isEmployer = user?.role === 'employer';
  
  const [step, setStep] = useState(0);
  const [mode, setMode] = useState(null); // 'demo' | 'personalized'
  
  // Demo Mode State
  const [selectedDemoProfile, setSelectedDemoProfile] = useState('');

  // Personalized Mode State (Job Seeker)
  const [education, setEducation] = useState({ school: '', program: '', level: '', year: '' });
  const [interests, setInterests] = useState([]);
  const [skills, setSkills] = useState([]);
  const [goals, setGoals] = useState([]);
  
  // Personalized Mode State (Employer)
  const [companyDetails, setCompanyDetails] = useState({ industry: '', size: '', hiringType: '' });
  const [rolesHiring, setRolesHiring] = useState([]);
  const [desiredSkills, setDesiredSkills] = useState([]);

  // Loader state
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingText, setLoadingText] = useState('');

  const runGenerationLoader = () => {
    setIsGenerating(true);
    const messages = isEmployer ? [
      "Analyzing company profile...",
      "Identifying top candidate pools...",
      "Finding internship-ready candidates...",
      "Preparing your employer dashboard..."
    ] : [
      "Analyzing your profile...",
      "Identifying strengths...",
      "Finding opportunities...",
      "Generating learning recommendations..."
    ];
    
    let i = 0;
    setLoadingText(messages[0]);
    const interval = setInterval(() => {
      i++;
      if (i < messages.length) {
        setLoadingText(messages[i]);
      } else {
        clearInterval(interval);
        completeOnboarding('personalized');
        navigate('/dashboard');
      }
    }, 1200);
  };

  const handleNext = () => {
    if (mode === 'demo') {
      if (step === 1 && selectedDemoProfile) {
        completeOnboarding('demo', selectedDemoProfile);
        navigate('/dashboard');
      } else {
        setStep(1);
      }
    } else if (mode === 'personalized') {
      const maxSteps = isEmployer ? 3 : 4;
      if (step < maxSteps) {
        setStep(step + 1);
      } else {
        runGenerationLoader();
      }
    }
  };

  const toggleArrayItem = (item, array, setArray) => {
    if (array.includes(item)) {
      setArray(array.filter(i => i !== item));
    } else {
      setArray([...array, item]);
    }
  };

  const renderStep0 = () => (
    <div className="onboarding-step text-center">
      <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>Welcome to SkillBridge, {user?.name?.split(' ')[0] || 'Kwame'} 👋</h2>
      <p className="muted" style={{ fontSize: '1.1rem', marginBottom: '32px' }}>How would you like to explore the platform today?</p>
      
      <div className="grid grid-cols-2" style={{ gap: '24px', maxWidth: '800px', margin: '0 auto' }}>
        <motion.div 
          className={`mode-card ${mode === 'demo' ? 'selected' : ''}`}
          onClick={() => setMode('demo')}
          whileHover={{ y: -4 }}
        >
          <div className="mode-icon"><Star size={32} /></div>
          <h3>Explore Demo Experience</h3>
          <p className="muted">Preview a fully completed dashboard with sample recommendations, stats, and insights. Great for demonstrations.</p>
        </motion.div>

        <motion.div 
          className={`mode-card ${mode === 'personalized' ? 'selected' : ''}`}
          onClick={() => setMode('personalized')}
          whileHover={{ y: -4 }}
        >
          <div className="mode-icon"><Target size={32} /></div>
          <h3>Set Up Personal Dashboard</h3>
          <p className="muted">Create a personalized experience based on your actual details. The dashboard starts empty and guides you.</p>
        </motion.div>
      </div>

      <div style={{ marginTop: '40px' }}>
        <button 
          className="btn primary lg" 
          disabled={!mode} 
          onClick={handleNext}
        >
          Continue <ArrowRight size={20} style={{ marginLeft: '8px' }} />
        </button>
      </div>
    </div>
  );

  const renderDemoFlow = () => (
    <div className="onboarding-step text-center">
      <h2>Choose a Sample Journey</h2>
      <p className="muted" style={{ marginBottom: '32px' }}>We'll populate your dashboard with data matching this profile.</p>
      
      <div className="grid grid-cols-2" style={{ gap: '16px', maxWidth: '600px', margin: '0 auto' }}>
        {['Aspiring Software Engineer', 'UI/UX Designer', 'Marketing Student', 'Data Analyst'].map(profile => (
          <div 
            key={profile}
            className={`selectable-card ${selectedDemoProfile === profile ? 'selected' : ''}`}
            onClick={() => setSelectedDemoProfile(profile)}
          >
            {profile}
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: '40px' }}>
        <button className="btn primary lg" disabled={!selectedDemoProfile} onClick={handleNext}>
          Launch Dashboard
        </button>
      </div>
    </div>
  );

  const renderJobSeekerPersonalized = () => {
    switch (step) {
      case 1: return (
        <div className="onboarding-step">
          <h2>Education Information</h2>
          <p className="muted">Tell us about your academic background.</p>
          <div className="form-group" style={{ marginTop: '24px' }}>
            <label>School / University</label>
            <select className="form-input" value={education.school} onChange={e => setEducation({...education, school: e.target.value})}>
              <option value="">Select an institution...</option>
              <option value="UG">University of Ghana</option>
              <option value="KNUST">KNUST</option>
              <option value="UPSA">UPSA</option>
              <option value="Ashesi">Ashesi University</option>
              <option value="Other">Other</option>
            </select>
            
            <label style={{ marginTop: '16px' }}>Program of Study</label>
            <input className="form-input" placeholder="e.g. Computer Science" value={education.program} onChange={e => setEducation({...education, program: e.target.value})} />
          </div>
          <button className="btn primary lg" style={{ marginTop: '32px' }} onClick={handleNext}>Next</button>
        </div>
      );
      case 2: return (
        <div className="onboarding-step">
          <h2>Career Interests</h2>
          <p className="muted">What career paths interest you? (Select all that apply)</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '24px' }}>
            {['Software Engineering', 'UI/UX Design', 'Cybersecurity', 'Marketing', 'Finance', 'Data Analysis', 'Entrepreneurship'].map(interest => (
              <div 
                key={interest} 
                className={`pill-select ${interests.includes(interest) ? 'selected' : ''}`}
                onClick={() => toggleArrayItem(interest, interests, setInterests)}
              >
                {interest}
              </div>
            ))}
          </div>
          <button className="btn primary lg" style={{ marginTop: '32px' }} onClick={handleNext}>Next</button>
        </div>
      );
      case 3: return (
        <div className="onboarding-step">
          <h2>Skills & Experience</h2>
          <p className="muted">What skills do you already have?</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '24px', marginBottom: '32px' }}>
            {['Excel', 'Communication', 'React', 'Canva', 'Leadership', 'Customer Service', 'Python', 'Figma'].map(skill => (
              <div 
                key={skill} 
                className={`pill-select ${skills.includes(skill) ? 'selected' : ''}`}
                onClick={() => toggleArrayItem(skill, skills, setSkills)}
              >
                {skill}
              </div>
            ))}
          </div>
          <div className="upload-box text-center" style={{ padding: '32px', border: '2px dashed var(--border)', borderRadius: '12px' }}>
            <UploadCloud size={32} className="muted" style={{ margin: '0 auto 12px' }} />
            <p>Upload your CV (Optional)</p>
            <span className="muted" style={{ fontSize: '0.8rem' }}>You can also do this later from your dashboard.</span>
          </div>
          <button className="btn primary lg" style={{ marginTop: '32px' }} onClick={handleNext}>Next</button>
        </div>
      );
      case 4: return (
        <div className="onboarding-step">
          <h2>Your Goals</h2>
          <p className="muted">What are you currently looking for?</p>
          <div className="grid grid-cols-2" style={{ gap: '16px', marginTop: '24px' }}>
            {['Internship', 'National Service', 'Entry-Level Job', 'Freelancing', 'Learning Opportunities'].map(goal => (
              <div 
                key={goal}
                className={`selectable-card ${goals.includes(goal) ? 'selected' : ''}`}
                onClick={() => toggleArrayItem(goal, goals, setGoals)}
              >
                {goal}
              </div>
            ))}
          </div>
          <button className="btn primary lg" style={{ marginTop: '32px' }} onClick={handleNext}>Generate Profile</button>
        </div>
      );
      default: return null;
    }
  };

  const renderEmployerPersonalized = () => {
    switch (step) {
      case 1: return (
        <div className="onboarding-step">
          <h2>Company Details</h2>
          <div className="form-group" style={{ marginTop: '24px' }}>
            <label>Industry</label>
            <input className="form-input" placeholder="e.g. Fintech, E-commerce" value={companyDetails.industry} onChange={e => setCompanyDetails({...companyDetails, industry: e.target.value})} />
            
            <label style={{ marginTop: '16px' }}>Company Size</label>
            <select className="form-input" value={companyDetails.size} onChange={e => setCompanyDetails({...companyDetails, size: e.target.value})}>
              <option value="">Select size...</option>
              <option value="1-10">1-10 employees</option>
              <option value="11-50">11-50 employees</option>
              <option value="51-200">51-200 employees</option>
              <option value="200+">200+ employees</option>
            </select>
          </div>
          <button className="btn primary lg" style={{ marginTop: '32px' }} onClick={handleNext}>Next</button>
        </div>
      );
      case 2: return (
        <div className="onboarding-step">
          <h2>Roles You Hire For</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '24px' }}>
            {['Frontend Developer', 'Customer Service', 'Marketing', 'Finance', 'Data Analyst', 'Product Manager'].map(role => (
              <div 
                key={role} 
                className={`pill-select ${rolesHiring.includes(role) ? 'selected' : ''}`}
                onClick={() => toggleArrayItem(role, rolesHiring, setRolesHiring)}
              >
                {role}
              </div>
            ))}
          </div>
          <button className="btn primary lg" style={{ marginTop: '32px' }} onClick={handleNext}>Next</button>
        </div>
      );
      case 3: return (
        <div className="onboarding-step">
          <h2>Desired Candidate Skills</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '24px' }}>
            {['Communication', 'React', 'Excel', 'Leadership', 'Problem Solving', 'Python', 'Figma'].map(skill => (
              <div 
                key={skill} 
                className={`pill-select ${desiredSkills.includes(skill) ? 'selected' : ''}`}
                onClick={() => toggleArrayItem(skill, desiredSkills, setDesiredSkills)}
              >
                {skill}
              </div>
            ))}
          </div>
          <button className="btn primary lg" style={{ marginTop: '32px' }} onClick={handleNext}>Generate Recommendations</button>
        </div>
      );
      default: return null;
    }
  };

  // Helper component for the ArrowRight icon since it was used in step 0
  const ArrowRight = ({ size, style }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d="M5 12h14"></path>
      <path d="m12 5 7 7-7 7"></path>
    </svg>
  );

  return (
    <div className="onboarding-layout">
      {isGenerating ? (
        <div className="onboarding-loader text-center">
          <div className="loader-ring lg" style={{ margin: '0 auto 24px' }}></div>
          <h2>{loadingText}</h2>
          <p className="muted" style={{ marginTop: '16px' }}>Setting up your personalized SkillBridge experience...</p>
        </div>
      ) : (
        <div className="onboarding-container">
          {/* Progress Bar (if not on step 0) */}
          {step > 0 && mode === 'personalized' && (
            <div className="onboarding-progress">
              <div className="bar-track">
                <motion.div 
                  className="bar-fill" 
                  initial={{ width: `${((step - 1) / (isEmployer ? 3 : 4)) * 100}%` }}
                  animate={{ width: `${(step / (isEmployer ? 3 : 4)) * 100}%` }} 
                />
              </div>
              <div className="progress-text text-right muted" style={{ fontSize: '0.8rem', marginTop: '8px' }}>
                Profile Setup — {Math.round((step / (isEmployer ? 3 : 4)) * 100)}% Complete
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={step + (mode || 'init')}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {step === 0 && renderStep0()}
              {mode === 'demo' && step === 1 && renderDemoFlow()}
              {mode === 'personalized' && !isEmployer && renderJobSeekerPersonalized()}
              {mode === 'personalized' && isEmployer && renderEmployerPersonalized()}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default OnboardingPage;
