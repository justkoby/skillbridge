// SkillBridge Chatbot — Simulated AI using keyword matching + real data
import { jobListings, candidateProfiles, companies, learningTracks, mockApplications } from '../data/ghanaianData';

const cvTips = [
  'Add measurable achievements (e.g. "Increased efficiency by 20%").',
  'Include links to your portfolio, GitHub, or Behance.',
  'Expand project descriptions with outcomes and impact.',
  'Add certifications relevant to your target role.',
  'Use strong action verbs: built, designed, led, improved.',
  'Tailor your CV objective to the role you are applying for.',
];

const ghanaMarketInsights = [
  { skill: 'Excel & Data Analysis', demand: 92 },
  { skill: 'Communication Skills', demand: 88 },
  { skill: 'Digital Marketing', demand: 81 },
  { skill: 'Customer Service', demand: 79 },
  { skill: 'UI/UX Design', demand: 74 },
  { skill: 'Python & Data Science', demand: 68 },
  { skill: 'Project Management', demand: 65 },
];

const companyProfiles = {
  hubtel: {
    name: 'Hubtel', industry: 'Fintech / Payments', founded: 2015, employees: '500+',
    about: 'Hubtel is Ghana\'s leading digital commerce platform enabling businesses to sell and receive payments digitally.',
    culture: 'Fast-paced, innovative, and entrepreneurial. Great for tech-focused students.',
    openRoles: ['UI/UX Design Intern', 'Backend Developer', 'Data Analyst'],
    skills: ['Figma', 'React', 'Python', 'SQL'],
  },
  mtn: {
    name: 'MTN Ghana', industry: 'Telecommunications', founded: 1996, employees: '2,000+',
    about: 'MTN Ghana is the country\'s largest telecom operator, serving over 27 million subscribers.',
    culture: 'Structured, professional, and great for National Service officers.',
    openRoles: ['Data Analyst Attaché', 'Marketing Intern', 'IT Support'],
    skills: ['Excel', 'Power BI', 'Communication', 'Customer Service'],
  },
  meltwater: {
    name: 'Meltwater', industry: 'Media Intelligence / Tech', founded: 2001, employees: '2,000+ globally',
    about: 'Meltwater helps businesses extract insights from the web and social media. Their Accra office is a top tech employer.',
    culture: 'International, data-driven, and career-accelerating.',
    openRoles: ['Frontend Developer', 'Business Development Intern', 'Data Scientist'],
    skills: ['JavaScript', 'React', 'SQL', 'Salesforce'],
  },
  zeepay: {
    name: 'Zeepay', industry: 'Cross-border Fintech', founded: 2014, employees: '200+',
    about: 'Zeepay connects Africans globally through mobile money and digital remittances.',
    culture: 'Young, agile startup culture. Great for entrepreneurial students.',
    openRoles: ['Product Design Intern', 'Mobile Developer', 'Growth Marketing'],
    skills: ['Figma', 'Flutter', 'Digital Marketing'],
  },
  stanbic: {
    name: 'Stanbic Bank', industry: 'Banking & Finance', founded: 1999, employees: '1,000+',
    about: 'Stanbic Bank Ghana is part of Standard Bank Group, offering corporate and retail banking services.',
    culture: 'Professional, structured, and prestigious. Ideal for finance and business students.',
    openRoles: ['Data Analyst Attachment', 'Business Analyst', 'Customer Service Officer'],
    skills: ['Excel', 'SQL', 'Financial Analysis', 'Communication'],
  },
  vodafone: {
    name: 'Vodafone Ghana', industry: 'Telecommunications', founded: 1994, employees: '1,500+',
    about: 'Vodafone Ghana provides mobile, broadband, and enterprise solutions across the country.',
    culture: 'Innovative and customer-centric, with strong mentorship programs.',
    openRoles: ['IT Intern', 'Digital Marketing Intern', 'Network Engineer Trainee'],
    skills: ['Networking', 'Digital Marketing', 'Customer Relations'],
  },
};

const interviewQAData = {
  general: [
    { q: 'Tell us about yourself.', tip: 'Use the Present-Past-Future framework. Start with your current status, mention relevant experience, and state your career goal.' },
    { q: 'Why do you want to work at this company?', tip: 'Research the company first. Mention their mission, a specific product/initiative you admire, and how it aligns with your goals.' },
    { q: 'What is your greatest strength?', tip: 'Choose a strength relevant to the role. Back it with a real example.' },
    { q: 'What is your greatest weakness?', tip: 'Name a real weakness but show what you\'re actively doing to improve it.' },
    { q: 'Where do you see yourself in 5 years?', tip: 'Show ambition but keep it realistic. Align your answer with growth opportunities at the company.' },
  ],
  behavioral: [
    { q: 'Describe a time you worked in a team and faced a conflict. How did you resolve it?', tip: 'Use the STAR method: Situation, Task, Action, Result.' },
    { q: 'Tell me about a project you are most proud of.', tip: 'Quantify your impact where possible. Explain what you learned.' },
    { q: 'Describe a situation where you had to meet a tight deadline.', tip: 'Show your prioritization and time management skills.' },
  ],
  technical: [
    { q: 'Walk me through your design process.', tip: 'For design roles: Empathize → Define → Ideate → Prototype → Test.' },
    { q: 'How do you stay updated with industry trends?', tip: 'Mention specific resources: LinkedIn, Twitter/X, newsletters, YouTube channels.' },
    { q: 'Explain a technical project from your CV.', tip: 'Be clear about your specific contribution, not just what the team did.' },
  ],
};

// ─── Response Generator ───────────────────────────────────────────────────────
export const generateResponse = (input, userRole = 'jobseeker') => {
  const msg = input.toLowerCase().trim();

  // Greetings
  if (/^(hi|hello|hey|good morning|good afternoon|good evening|yo|helo)/.test(msg)) {
    return {
      type: 'text',
      message: userRole === 'employer'
        ? "Hello! I'm SkillBridge Assistant. I can help you find top candidates, review your job posts, or explore hiring insights. What would you like to do?"
        : "Hello! I'm SkillBridge Assistant 👋 I can help you find internships, improve your CV, recommend learning paths, or explore companies. What are you looking for?",
      suggestions: userRole === 'employer'
        ? ['Find frontend candidates', 'Show top matches', 'Which candidates have Excel skills?']
        : ['Find internships in Accra', 'Improve my CV', 'What careers fit my skills?', 'Tell me about Hubtel'],
    };
  }

  // ── STUDENT FLOWS ──────────────────────────────────────────────────────────

  // Internships
  if (/internship|attachment|intern|national service|service/.test(msg)) {
    const internships = jobListings.filter(j =>
      j.type === 'Graduate Internship' || j.type === 'National Service' || j.type === 'Student Attachment'
    );
    const locationFilter = msg.includes('accra') ? internships.filter(j => j.location.includes('Accra')) : internships;
    return {
      type: 'jobs',
      message: `Here are ${locationFilter.length} internship and national service opportunities that match your profile:`,
      data: locationFilter,
      suggestions: ['Tell me about MTN Ghana', 'How do I apply?', 'What skills do I need?'],
    };
  }

  // CV Help
  if (/cv|resume|curriculum|profile strength|improve my/.test(msg)) {
    return {
      type: 'cv-tips',
      message: "Here are personalised suggestions to improve your CV and increase your career readiness score:",
      data: cvTips,
      suggestions: ['What is my current score?', 'Find internships', 'Recommend learning paths'],
    };
  }

  // Career Fit / Skills
  if (/career|fit my skills|good at|suited|what career|what job|job for me/.test(msg)) {
    const topMatches = jobListings.slice(0, 4);
    return {
      type: 'jobs',
      message: "Based on your skills profile, here are careers and roles that suit you best:",
      data: topMatches,
      suggestions: ['How do I improve my match?', 'Recommend learning paths', 'Tell me about Hubtel'],
    };
  }

  // Learning Paths
  if (/learn|course|path|track|study|skill up|training|upskill/.test(msg)) {
    return {
      type: 'learning',
      message: "Based on your profile and the current job market in Ghana, I recommend these learning tracks:",
      data: learningTracks.slice(0, 3),
      suggestions: ['Find internships', 'Improve my CV', 'What skills do employers want?'],
    };
  }

  // Job Market / Skills in Demand
  if (/market|demand|employer want|skills needed|trending|in demand|ghana job/.test(msg)) {
    return {
      type: 'market-insights',
      message: "Here are the top skills employers in Ghana are looking for right now:",
      data: ghanaMarketInsights,
      suggestions: ['Find internships', 'Recommend learning paths', 'Improve my CV'],
    };
  }

  // Company lookups
  const companyKeys = Object.keys(companyProfiles);
  const matchedCompany = companyKeys.find(key => msg.includes(key) || msg.includes(companyProfiles[key].name.toLowerCase()));
  if (matchedCompany) {
    const co = companyProfiles[matchedCompany];
    return {
      type: 'company',
      message: `Here's what you need to know about **${co.name}**:`,
      data: co,
      suggestions: [`Find roles at ${co.name}`, 'Find other internships', 'What skills do I need?'],
    };
  }

  // Interview help
  if (/interview|practice|mock|question|prepare|preparation/.test(msg)) {
    return {
      type: 'interview',
      message: "Great idea to prepare! Here are some common interview questions with tips:",
      data: interviewQAData.general.slice(0, 3),
      suggestions: ['Behavioral questions', 'Technical questions', 'Find internships'],
    };
  }

  // Applications
  if (/appli|applied|status|track/.test(msg)) {
    return {
      type: 'applications',
      message: "Here's a summary of your recent applications:",
      data: mockApplications.slice(0, 4),
      suggestions: ['Find more internships', 'Improve my CV', 'Prepare for interview'],
    };
  }

  // ── EMPLOYER FLOWS ──────────────────────────────────────────────────────────

  if (userRole === 'employer') {
    // Find candidates by skill
    const skillKeywords = ['frontend', 'react', 'figma', 'design', 'excel', 'python', 'data', 'communication', 'marketing'];
    const matchedSkill = skillKeywords.find(s => msg.includes(s));
    if (/candidate|find|show|who|applicant|match|recommend/.test(msg) || matchedSkill) {
      const filtered = matchedSkill
        ? candidateProfiles.filter(c => c.skills.some(s => s.toLowerCase().includes(matchedSkill)))
        : candidateProfiles;
      const results = filtered.length > 0 ? filtered : candidateProfiles.slice(0, 3);
      return {
        type: 'candidates',
        message: `Here are ${results.length} recommended candidates${matchedSkill ? ` with ${matchedSkill} skills` : ''}:`,
        data: results,
        suggestions: ['Find communication-skilled candidates', 'Show top matches', 'Internship-ready candidates'],
      };
    }

    // Hiring insights
    if (/insight|trend|skill gap|missing|improve post|description/.test(msg)) {
      return {
        type: 'employer-insight',
        message: "Here are key hiring insights for the current Ghana job market:",
        data: [
          'Most applicants are missing measurable project experience.',
          'Communication skills are the top differentiator among shortlisted candidates.',
          '74% of strong matches have portfolio links in their profiles.',
          'Internship-ready candidates respond 3x faster than others.',
          'Adding "Training Included" to your post increases applicants by 40%.',
        ],
        suggestions: ['Find top candidates', 'Post a new job', 'Find communication-skilled candidates'],
      };
    }
  }

  // Fallback
  return {
    type: 'text',
    message: "I'm not sure about that one — but I can help you with internships, CV tips, learning paths, company info, or career advice. What would you like to explore?",
    suggestions: ['Find internships', 'Improve my CV', 'What careers fit my skills?', 'Tell me about Hubtel'],
  };
};

export { cvTips, ghanaMarketInsights, companyProfiles, interviewQAData };
