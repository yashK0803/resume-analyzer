import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, FileText, CheckCircle, AlertCircle, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';
import './UploadPage.css';

const JOB_ROLES = [
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'Data Analyst',
  'Data Scientist',
  'Product Manager',
  'DevOps Engineer'
];

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [role, setRole] = useState(JOB_ROLES[0]);
  const [activeTab, setActiveTab] = useState('pdf');
  const [isDragActive, setIsDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = () => {
    setIsDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setText('');
      setActiveTab('pdf');
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setText('');
      setActiveTab('pdf');
    }
  };

  const handleAnalyze = async () => {
    if (activeTab === 'pdf' && !file) {
      setError('Please upload a PDF to analyze.');
      return;
    }
    if (activeTab === 'text' && !text.trim()) {
      setError('Please paste text to analyze.');
      return;
    }
    
    setError('');
    setLoading(true);

    const formData = new FormData();
    formData.append('role', role);
    if (activeTab === 'pdf') {
      formData.append('resume', file);
    } else {
      formData.append('text', text);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/analyze', formData, {
        headers: activeTab === 'pdf' ? { 'Content-Type': 'multipart/form-data' } : { 'Content-Type': 'application/json' }
      });
      // Save results
      localStorage.setItem('resumeAnalysis', JSON.stringify(response.data));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Error analyzing resume. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      className="container upload-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="upload-header text-center">
        <h1 className="gradient-text text-5xl mb-4">Smart Resume Analyzer</h1>
        <p className="subtitle">Upload your resume to get an ATS score, missing skills analysis, and tailored improvements.</p>
      </div>

      <div className="upload-grid">
        <div className="glass-panel upload-panel">
          <h2 className="mb-4 flex-center"><Briefcase size={22} className="mr-2 text-primary"/> Select Target Role</h2>
          <div className="select-wrapper">
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              className="input-field role-select"
            >
              {JOB_ROLES.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <h2 className="mt-8 mb-4 flex-center"><UploadCloud size={22} className="mr-2 text-secondary"/> Input Your Resume</h2>
          
          <div className="tabs">
            <button className={`tab ${activeTab === 'pdf' ? 'active' : ''}`} onClick={() => setActiveTab('pdf')}>PDF Upload</button>
            <button className={`tab ${activeTab === 'text' ? 'active' : ''}`} onClick={() => setActiveTab('text')}>Paste Text</button>
          </div>

          {activeTab === 'pdf' ? (
            <div 
              className={`dropzone ${isDragActive ? 'active' : ''} ${file ? 'has-file' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input 
                type="file" 
                accept=".pdf" 
                onChange={handleFileChange} 
                id="file-upload" 
                hidden
              />
              <label htmlFor="file-upload" className="dropzone-content">
                {file ? (
                  <>
                    <FileText size={48} className="file-icon text-success" />
                    <h3 className="file-name">{file.name}</h3>
                    <p className="file-size">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    <span className="btn btn-outline btn-sm mt-3">Change File</span>
                  </>
                ) : (
                  <>
                    <UploadCloud size={48} className="dropzone-icon" />
                    <h3>Drag & Drop your PDF here</h3>
                    <p>or click to browse</p>
                  </>
                )}
              </label>
            </div>
          ) : (
             <div className="text-input-area">
               <textarea 
                 value={text}
                 onChange={(e) => setText(e.target.value)}
                 className="input-field resume-textarea"
                 placeholder="Paste your resume content here..."
                 rows="8"
               ></textarea>
             </div>
          )}

          {error && (
            <div className="alert error">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <div className="action-area mt-6">
            <button 
              className={`btn btn-primary analyze-btn ${loading ? 'loading' : ''}`} 
              onClick={handleAnalyze}
              disabled={loading}
            >
              {loading ? (
                <span className="spinner"></span>
              ) : (
                <>
                  <CheckCircle size={20} />
                  Analyze Resume
                </>
              )}
            </button>
          </div>
        </div>

        <div className="info-panel glass-panel">
          <h3>How it works</h3>
          <ul className="steps">
            <li>
              <div className="step-num">1</div>
              <div className="step-content">
                <h4>Select Job Role</h4>
                <p>Choose the target position to tailor the skill matching process.</p>
              </div>
            </li>
            <li>
              <div className="step-num">2</div>
              <div className="step-content">
                <h4>Upload Resume</h4>
                <p>Provide your resume in PDF format or paste raw text.</p>
              </div>
            </li>
            <li>
              <div className="step-num">3</div>
              <div className="step-content">
                <h4>Analyze & Scoring</h4>
                <p>Our engine matches your skills against ATS requirements for the role.</p>
              </div>
            </li>
            <li>
              <div className="step-num">4</div>
              <div className="step-content">
                <h4>Get Actionable Insights</h4>
                <p>Review missing skills, keyword density, and grammar suggestions to improve.</p>
              </div>
            </li>
          </ul>
          
          <div className="stats-mini">
            <div className="stat"><span>98%</span>Match Accuracy</div>
            <div className="stat"><span>5k+</span>Roles Supported</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UploadPage;
