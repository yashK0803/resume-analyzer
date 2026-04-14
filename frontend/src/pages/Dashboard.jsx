import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { Award, Target, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedData = localStorage.getItem('resumeAnalysis');
    if (savedData) {
      setData(JSON.parse(savedData));
    } else {
      // If no data, maybe redirect to home or show placeholder
    }
  }, []);

  if (!data) {
    return (
      <div className="container flex-center" style={{ minHeight: '60vh', flexDirection: 'column' }}>
        <h2>No Analysis Data Found</h2>
        <p className="text-muted mt-2 mb-4">Please upload a resume first to see your dashboard.</p>
        <button className="btn btn-primary" onClick={() => navigate('/')}>Go to Upload</button>
      </div>
    );
  }

  const { score, role, matchedSkills, missingSkills, sectionPresence } = data;

  const scoreData = [
    { name: 'Score', value: score },
    { name: 'Remaining', value: 100 - score }
  ];
  
  const COLORS = ['#6366f1', 'rgba(255,255,255,0.05)'];

  const getScoreColor = (s) => {
    if (s >= 80) return 'var(--success)';
    if (s >= 50) return 'var(--warning)';
    return 'var(--danger)';
  };

  return (
    <motion.div 
      className="container dashboard-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="dashboard-header">
        <div>
          <h1 className="text-4xl mb-2">Analysis Overview</h1>
          <p className="text-muted">Target Role: <span className="text-primary font-bold">{role}</span></p>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary" onClick={() => navigate('/analysis')}>
            View Detailed Analysis <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Main Score Card */}
        <div className="glass-panel score-card flex-center direction-col">
          <h3 className="mb-4">ATS Compatibility Score</h3>
          <div className="score-chart-container">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={scoreData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={100}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                  stroke="none"
                >
                  <Cell fill={getScoreColor(score)} />
                  <Cell fill={COLORS[1]} />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="score-display" style={{ color: getScoreColor(score) }}>
              <span className="score-value">{Math.round(score)}</span>
              <span className="score-max">/100</span>
            </div>
          </div>
          <p className="text-center text-muted mt-2">
            {score >= 80 ? "Great job! Your resume is highly optimized for this role." :
             score >= 50 ? "Good start, but there's room for improvement." :
             "Your resume needs significant changes to pass ATS filters."}
          </p>
        </div>

        {/* Quick Stats Grid */}
        <div className="quick-stats">
          <div className="glass-panel stat-card">
            <div className="stat-icon bg-success">
              <CheckCircle2 size={24} />
            </div>
            <div className="stat-info">
              <h4>Matched Skills</h4>
              <span className="stat-number">{matchedSkills.length}</span>
            </div>
          </div>
          
          <div className="glass-panel stat-card">
            <div className="stat-icon bg-warning">
              <Target size={24} />
            </div>
            <div className="stat-info">
              <h4>Missing Core Skills</h4>
              <span className="stat-number">{missingSkills.length}</span>
            </div>
          </div>
          
          <div className="glass-panel stat-card full-width">
            <div className="stat-icon bg-primary">
              <Award size={24} />
            </div>
            <div className="stat-info w-full">
              <h4>Section Check</h4>
              <div className="section-badges mt-2">
                <span className={`badge ${sectionPresence.skills ? 'badge-success' : 'badge-error'}`}>
                  Skills {sectionPresence.skills ? '✓' : '✗'}
                </span>
                <span className={`badge ${sectionPresence.education ? 'badge-success' : 'badge-error'}`}>
                  Education {sectionPresence.education ? '✓' : '✗'}
                </span>
                <span className={`badge ${sectionPresence.projects || sectionPresence.experience ? 'badge-success' : 'badge-error'}`}>
                  Experience/Projects {(sectionPresence.projects || sectionPresence.experience) ? '✓' : '✗'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="glass-panel stat-card full-width bg-gradient">
            <div className="stat-icon bg-accent">
              <AlertTriangle size={24} />
            </div>
            <div className="stat-info">
              <h4>Top Suggestion</h4>
              <p className="mt-2 text-sm">{data.suggestions && data.suggestions.length > 0 ? data.suggestions[0] : "Add more relevant keywords to improve your score."}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
