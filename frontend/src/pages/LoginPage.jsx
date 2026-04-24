import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Lock, Mail, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock login action
    console.log('Logging in with', email, password);
    navigate('/upload');
  };

  const handleContinueWithoutAccount = () => {
    navigate('/upload');
  };

  return (
    <motion.div 
      className="container login-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="login-card glass-panel">
        <div className="login-header">
          <Briefcase className="logo-icon text-primary mb-4 mx-auto" size={48} />
          <h1 className="gradient-text text-4xl mb-2 text-center">Welcome Back</h1>
          <p className="text-center text-muted">Sign in to access your saved resume analyses</p>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <Mail className="input-icon" size={18} />
            <input 
              type="email" 
              placeholder="Email Address" 
              className="input-field" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="input-group">
            <Lock className="input-icon" size={18} />
            <input 
              type="password" 
              placeholder="Password" 
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary login-submit-btn w-full">
            Sign In
          </button>
        </form>

        <div className="divider">
          <span>or</span>
        </div>

        <button 
          onClick={handleContinueWithoutAccount} 
          className="btn btn-outline continue-btn w-full flex-center"
        >
          Continue without account
          <ArrowRight size={18} className="ml-2" />
        </button>
      </div>
    </motion.div>
  );
};

export default LoginPage;
