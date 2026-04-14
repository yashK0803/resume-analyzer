import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lightbulb, ArrowRight, ChevronRight } from 'lucide-react';
import './SuggestionsPage.css';

const SuggestionsPage = () => {
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

  return (
    <motion.div 
      className="container suggestions-container"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="text-center mb-10">
        <h1 className="text-4xl mb-2 gradient-text">Actionable Advice</h1>
        <p className="subtitle">Follow these recommendations to improve your resume for a <span className="text-primary font-bold">{data.role}</span> role.</p>
      </div>

      <div className="suggestions-list">
        {data.suggestions && data.suggestions.length > 0 ? (
          data.suggestions.map((suggestion, index) => (
            <motion.div 
              key={index}
              className="glass-panel suggestion-card"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="suggestion-icon bg-gradient">
                <Lightbulb size={24} className="text-accent"/>
              </div>
              <div className="suggestion-content">
                <p>{suggestion}</p>
              </div>
              <ChevronRight className="chevron text-muted" />
            </motion.div>
          ))
        ) : (
          <div className="glass-panel text-center py-4 px-4">
            <h3 className="text-success mb-2">Looks Good!</h3>
            <p className="text-muted">No critical suggestions found. Your resume structure looks solid.</p>
          </div>
        )}
      </div>

      <div className="action-buttons mt-8 flex-center">
        <button className="btn btn-outline" style={{marginRight: '1rem'}} onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </button>
        <button className="btn btn-primary" onClick={() => window.print()}>
          Download Report
        </button>
      </div>
    </motion.div>
  );
};

export default SuggestionsPage;
