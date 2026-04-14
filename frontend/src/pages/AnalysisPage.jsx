import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, X, BarChart2 } from 'lucide-react';
import './AnalysisPage.css';

const AnalysisPage = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedData = localStorage.getItem('resumeAnalysis');
    if (savedData) {
      setData(JSON.parse(savedData));
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (!data) return null;

  const { matchedSkills, missingSkills, sectionPresence } = data;

  return (
    <motion.div 
      className="container analysis-container"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="header-section text-center mb-10">
        <h1 className="text-4xl mb-2">Detailed Skill Analysis</h1>
        <p className="subtitle">See exactly which keywords ATS systems found in your resume.</p>
      </div>

      <div className="analysis-grid">
        <div className="glass-panel skill-panel">
          <div className="panel-header border-b">
            <h2 className="flex-center text-success"><Check className="mr-2"/> Matched Skills</h2>
            <span className="badge badge-success">{matchedSkills.length} Found</span>
          </div>
          <div className="panel-content">
            {matchedSkills.length > 0 ? (
              <div className="skill-tags">
                {matchedSkills.map((skill, index) => (
                  <span key={index} className="skill-tag matched">{skill}</span>
                ))}
              </div>
            ) : (
              <p className="text-muted text-center py-4">No matching skills found for this role.</p>
            )}
          </div>
        </div>

        <div className="glass-panel skill-panel">
          <div className="panel-header border-b">
            <h2 className="flex-center text-danger"><X className="mr-2"/> Missing Core Skills</h2>
            <span className="badge badge-error">{missingSkills.length} Missing</span>
          </div>
          <div className="panel-content">
            {missingSkills.length > 0 ? (
              <div className="skill-tags">
                {missingSkills.map((skill, index) => (
                  <span key={index} className="skill-tag missing">{skill}</span>
                ))}
              </div>
            ) : (
              <p className="text-muted text-center py-4">Great! You have all the core expected skills.</p>
            )}
          </div>
        </div>
      </div>

      <div className="glass-panel mt-6">
        <div className="panel-header border-b">
          <h2 className="flex-center"><BarChart2 className="mr-2 text-primary" /> Section Analysis</h2>
        </div>
        <div className="panel-content section-analysis">
          <div className="section-item">
            <div className="section-info">
              <h3>Skills Section</h3>
              <p className="text-muted">Dedicated section listing technical/soft skills.</p>
            </div>
            <div className={`status-icon ${sectionPresence.skills ? 'text-success' : 'text-danger'}`}>
              {sectionPresence.skills ? <Check size={28} /> : <X size={28} />}
            </div>
          </div>
          <div className="section-item">
            <div className="section-info">
              <h3>Education</h3>
              <p className="text-muted">Academic background and degrees.</p>
            </div>
            <div className={`status-icon ${sectionPresence.education ? 'text-success' : 'text-danger'}`}>
              {sectionPresence.education ? <Check size={28} /> : <X size={28} />}
            </div>
          </div>
          <div className="section-item">
            <div className="section-info">
              <h3>Experience / Projects</h3>
              <p className="text-muted">Work history or personal projects.</p>
            </div>
            <div className={`status-icon ${sectionPresence.projects || sectionPresence.experience ? 'text-success' : 'text-danger'}`}>
              {(sectionPresence.projects || sectionPresence.experience) ? <Check size={28} /> : <X size={28} />}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AnalysisPage;
