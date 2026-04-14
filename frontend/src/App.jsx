import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Briefcase, LayoutDashboard, FileText, Lightbulb, UserCircle } from 'lucide-react';
import UploadPage from './pages/UploadPage';
import Dashboard from './pages/Dashboard';
import AnalysisPage from './pages/AnalysisPage';
import SuggestionsPage from './pages/SuggestionsPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-layout">
        <nav className="navbar glass-panel">
          <div className="container nav-container">
            <Link to="/" className="logo">
              <Briefcase className="logo-icon" size={28} />
              <span className="gradient-text">ResumePro</span>
            </Link>
            
            <div className="nav-links">
              <Link to="/" className="nav-link">
                <LayoutDashboard size={18} />
                <span>Upload</span>
              </Link>
              <Link to="/dashboard" className="nav-link">
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </Link>
              <Link to="/analysis" className="nav-link">
                <FileText size={18} />
                <span>Analysis</span>
              </Link>
              <Link to="/suggestions" className="nav-link">
                <Lightbulb size={18} />
                <span>Suggestions</span>
              </Link>
              <button className="btn btn-outline login-btn">
                <UserCircle size={18} />
                <span>Login</span>
              </button>
            </div>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<UploadPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analysis" element={<AnalysisPage />} />
            <Route path="/suggestions" element={<SuggestionsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
