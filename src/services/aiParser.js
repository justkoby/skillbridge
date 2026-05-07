import * as pdfjs from 'pdfjs-dist';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

/**
 * AI Parsing Service for Skillbridge
 * Handles document text extraction and skill detection.
 */

// A comprehensive dictionary of skills to detect (Simulating AI NLP)
const SKILL_DICTIONARY = {
  technical: [
    'React', 'JavaScript', 'PHP', 'Python', 'Java', 'C++', 'SQL', 'NoSQL', 'SQLite', 'Node.js', 
    'HTML', 'CSS', 'Tailwind', 'Git', 'Docker', 'AWS', 'Azure', 'Machine Learning', 'Data Analysis',
    'Excel', 'Spreadsheets', 'CRM', 'SAP', 'Tableau', 'Power BI', 'Wordpress', 'Photoshop', 'Figma'
  ],
  soft: [
    'Communication', 'Leadership', 'Teamwork', 'Problem Solving', 'Critical Thinking', 'Adaptability',
    'Time Management', 'Creativity', 'Public Speaking', 'Conflict Resolution', 'Emotional Intelligence'
  ],
  operational: [
    'Customer Service', 'Data Entry', 'Project Management', 'Agile', 'Scrum', 'Sales', 'Marketing',
    'Account Management', 'Administrative Support', 'Scheduling', 'Reporting'
  ]
};

// Synonym Map for Fuzzy Matching
const SYNONYM_MAP = {
  'JavaScript': ['JS', 'ES6', 'ECMAScript'],
  'React': ['React.js', 'ReactJS'],
  'Node.js': ['Node', 'NodeJS'],
  'Excel': ['MS Excel', 'Microsoft Excel', 'Spreadsheets'],
  'Customer Service': ['Customer Support', 'Client Relations', 'Customer Care'],
  'Project Management': ['PM', 'Project Coordination'],
  'Communication': ['Public Speaking', 'Presentation', 'Verbal Skills']
};

// Mock Job Database with Weights and Requirements
const MOCK_JOBS = [
  {
    id: 'job1',
    title: 'Junior Web Developer',
    company: 'TechNova Ghana',
    requirements: [
      { skill: 'React', weight: 1.0, type: 'Essential' },
      { skill: 'JavaScript', weight: 0.8, type: 'Essential' },
      { skill: 'Git', weight: 0.4, type: 'Desirable' },
      { skill: 'CSS', weight: 0.4, type: 'Desirable' }
    ],
    minExperience: 1, // in years
    location: 'Accra'
  },
  {
    id: 'job2',
    title: 'Senior Administrative Assistant',
    company: 'Capital Group',
    requirements: [
      { skill: 'Excel', weight: 1.0, type: 'Essential' },
      { skill: 'Administrative Support', weight: 0.8, type: 'Essential' },
      { skill: 'Communication', weight: 0.6, type: 'Essential' },
      { skill: 'Data Entry', weight: 0.4, type: 'Desirable' }
    ],
    minExperience: 3,
    location: 'Kumasi'
  }
];

export const extractTextFromPDF = async (file) => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
  let fullText = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const strings = content.items.map(item => item.str);
    fullText += strings.join(' ') + ' ';
  }

  return fullText;
};

export const detectSkills = (text) => {
  const detected = {
    technical: [],
    soft: [],
    operational: []
  };

  const lowerText = text.toLowerCase();

  // Simple keyword matching (Simulated AI NLP)
  Object.keys(SKILL_DICTIONARY).forEach(category => {
    SKILL_DICTIONARY[category].forEach(skill => {
      const variants = [skill, ...(SYNONYM_MAP[skill] || [])];
      if (variants.some(v => lowerText.includes(v.toLowerCase()))) {
        detected[category].push(skill);
      }
    });
  });

  return detected;
};

export const detectExperience = (text) => {
  const lowerText = text.toLowerCase();
  const yearMatch = lowerText.match(/(\d+)\+?\s*years?\s*experience/);
  return yearMatch ? parseInt(yearMatch[1]) : 0;
};

export const calculateJobMatches = (userSkills, experience = 0) => {
  const allUserSkills = [...userSkills.technical, ...userSkills.soft, ...userSkills.operational];
  
  return MOCK_JOBS.map(job => {
    let totalScore = 0;
    let maxPossibleScore = 0;
    const matches = [];
    const missing = [];

    job.requirements.forEach(req => {
      const hasSkill = allUserSkills.some(userSkill => 
        userSkill.toLowerCase() === req.skill.toLowerCase()
      );
      
      maxPossibleScore += req.weight;
      if (hasSkill) {
        totalScore += req.weight;
        matches.push(req.skill);
      } else {
        missing.push(req.skill);
      }
    });

    // Experience Penalty/Bonus (Simplified)
    let experienceFit = 1.0;
    if (experience < job.minExperience) {
      experienceFit = 0.8; // 20% penalty if under-experienced
    }

    const finalScore = Math.round((totalScore / maxPossibleScore) * 100 * experienceFit);

    return {
      ...job,
      score: Math.min(100, finalScore),
      matchCount: matches.length,
      missingSkills: missing,
      experienceGap: experience < job.minExperience
    };
  }).sort((a, b) => b.score - a.score);
};

export const analyzeSkillGap = (userSkills, topJob) => {
  if (!topJob) return [];
  
  // High impact gaps are missing skills that are required for the top job
  return topJob.missingSkills.map(skill => ({
    skill,
    importance: 'High',
    recommendation: `Complete a 4-hour micro-course on ${skill} basics.`
  }));
};
