import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, LockKeyhole, ArrowRight, Code2, Terminal } from 'lucide-react';
import './Auth.scss'; // Importing the shared SCSS

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError('Missing credentials. Please provide all fields.');
      return;
    }

    // Mock Login Execution
    console.log('Authenticating node:', formData.email);
  };

  return (
    <div className="auth-container">
      {/* Background Ambience */}
      <div className="bg-grid"></div>
      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>

      <div className="auth-card">
        <div className="auth-header">
          <div className="brand-badge">
            <Code2 size={20} className="brand-icon" />
            <span>TrimLink.sys</span>
          </div>
          <h2>Initiate Session</h2>
          <p>Authenticate to access your routing dashboard.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && (
            <div className="error-banner">
              <Terminal size={16} />
              <span>{error}</span>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Secure Email</label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={18} />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="dev@domain.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Passphrase</label>
            <div className="input-wrapper">
              <LockKeyhole className="input-icon" size={18} />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••••••"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="submit-btn">
            <span>Execute Login</span>
            <ArrowRight size={18} className="btn-icon" />
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an access node?{' '}
            <Link to="/register" className="nav-link">
              Request Access
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;