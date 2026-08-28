import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, LockKeyhole, ArrowRight, Code2, Terminal } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import './Auth.scss';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError('Missing credentials. Please provide all fields.');
      return;
    }

    setSubmitting(true);
    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.data?.message || 'Invalid email or password.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
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
                autoComplete="email"
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
                autoComplete="current-password"
                placeholder="••••••••••••"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={submitting}>
            <span>{submitting ? 'Authenticating…' : 'Execute Login'}</span>
            <ArrowRight size={18} className="btn-icon" />
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an access node?{' '}
            <Link to="/register" className="nav-link">Request Access</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;