// Simplified predefined skills datasets
const JOB_SKILLS = {
  'Frontend Developer': ['html', 'css', 'javascript', 'react', 'git', 'redux', 'typescript', 'tailwind', 'vue', 'webpack', 'ui/ux', 'responsive design'],
  'Backend Developer': ['node.js', 'express', 'python', 'java', 'sql', 'mongodb', 'docker', 'api', 'aws', 'kubernetes', 'postgresql', 'c#'],
  'Full Stack Developer': ['html', 'css', 'javascript', 'react', 'node.js', 'sql', 'mongodb', 'git', 'express', 'docker', 'typescript', 'aws'],
  'Data Analyst': ['python', 'sql', 'excel', 'power bi', 'tableau', 'r', 'statistics', 'pandas', 'data visualization', 'dashboard'],
  'Data Scientist': ['python', 'machine learning', 'sql', 'r', 'deep learning', 'pandas', 'numpy', 'tensorflow', 'statistics', 'nlp', 'data mining'],
  'Product Manager': ['agile', 'scrum', 'jira', 'roadmap', 'user research', 'a/b testing', 'analytics', 'strategy', 'stakeholder management'],
  'DevOps Engineer': ['linux', 'docker', 'kubernetes', 'aws', 'jenkins', 'ci/cd', 'terraform', 'ansible', 'bash', 'python', 'networking']
};

exports.analyze = (resumeText, role) => {
  const normalizedText = resumeText.toLowerCase();
  
  // 1. Skill Matching
  const requiredSkills = JOB_SKILLS[role] || [];
  const matchedSkills = [];
  const missingSkills = [];

  requiredSkills.forEach(skill => {
    // Regex boundary check for clean word matching or phrase matching
    // Handle special characters in skills like node.js, c#, etc.
    const escapedSkill = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escapedSkill}\\b`, 'i');
    
    if (regex.test(normalizedText) || normalizedText.includes(skill)) {
      matchedSkills.push(skill);
    } else {
      missingSkills.push(skill);
    }
  });

  // 2. Section Detection
  const sectionPresence = {
    skills: /skills|technical skills|technologies/i.test(normalizedText),
    education: /education|academic background|degree/i.test(normalizedText),
    experience: /experience|employment|work history/i.test(normalizedText),
    projects: /projects|personal projects|academic projects/i.test(normalizedText)
  };

  // 3. Scoring Engine
  // 70% weight on skills, 30% weight on sections
  const skillScore = requiredSkills.length > 0 ? (matchedSkills.length / requiredSkills.length) * 70 : 0;
  
  let sectionScore = 0;
  if (sectionPresence.skills) sectionScore += 10;
  if (sectionPresence.education) sectionScore += 5;
  if (sectionPresence.experience) sectionScore += 10;
  if (sectionPresence.projects) sectionScore += 5;
  
  const score = Math.min(100, Math.round(skillScore + sectionScore));

  // 4. Generate Suggestions
  const suggestions = [];

  if (missingSkills.length > 0) {
    const topMissing = missingSkills.slice(0, 3).join(', ');
    suggestions.push(`Add missing core skills for this role: ${topMissing}.`);
  }

  if (!sectionPresence.skills) {
    suggestions.push("Add a dedicated 'Skills' section so ATS scanners can easily identify your capabilities.");
  }

  if (!sectionPresence.projects && !sectionPresence.experience) {
    suggestions.push("Your resume lacks 'Experience' or 'Projects'. Add these sections to prove practical implementation of your skills.");
  }

  if (!sectionPresence.education) {
    suggestions.push("Ensure your 'Education' section is clearly labeled.");
  }

  if (matchedSkills.length < (requiredSkills.length * 0.5)) {
    suggestions.push("Your keyword density for this role is low. Try to organically include more specialized terminology in your bullet points.");
  }

  // Capitalize skills for presentation
  const capitalize = (arr) => arr.map(s => s.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '));

  return {
    score,
    matchedSkills: capitalize(matchedSkills),
    missingSkills: capitalize(missingSkills),
    sectionPresence,
    suggestions
  };
};
